const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const frontendDir = path.join(rootDir, 'frontend');
const backendDir = path.join(rootDir, 'backend');
const stagingDir = path.join(rootDir, 'publish_staging');
const zipPath = path.join(rootDir, 'publish.zip');

function log(msg) {
    console.log(`[Publish] ${msg}`);
}

try {
    // 1. Build frontend
    log('Building frontend...');
    execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });

    // 2. Clean/Create staging directory
    if (fs.existsSync(stagingDir)) {
        fs.rmSync(stagingDir, { recursive: true, force: true });
    }
    fs.mkdirSync(stagingDir);

    // 3. Copy frontend dist files to staging root
    log('Copying frontend build files...');
    const distDir = path.join(frontendDir, 'dist');
    if (!fs.existsSync(distDir)) {
        throw new Error('Frontend build output (dist) not found. Build may have failed.');
    }
    fs.cpSync(distDir, stagingDir, { recursive: true });

    // 4. Copy backend api to staging/api
    log('Copying backend api files...');
    const apiSrc = path.join(backendDir, 'api');
    const apiDest = path.join(stagingDir, 'api');
    fs.cpSync(apiSrc, apiDest, { recursive: true });

    // 5. Copy backend uploads to staging/uploads
    log('Copying backend uploads files...');
    const uploadsSrc = path.join(backendDir, 'uploads');
    const uploadsDest = path.join(stagingDir, 'uploads');
    if (fs.existsSync(uploadsSrc)) {
        fs.cpSync(uploadsSrc, uploadsDest, { recursive: true });
    } else {
        fs.mkdirSync(uploadsDest);
    }

    // 6. Zip the staging directory
    log('Packaging publish.zip...');
    if (fs.existsSync(zipPath)) {
        fs.rmSync(zipPath, { force: true });
    }

    if (process.platform === 'win32') {
        // Use PowerShell to compress staging contents, including hidden files
        const psCommand = `powershell -Command "Get-ChildItem -Path '${stagingDir}' -Force | Compress-Archive -DestinationPath '${zipPath}' -Force"`;
        execSync(psCommand, { stdio: 'inherit' });
    } else {
        // Use zip command on macOS/Linux
        execSync(`zip -r "${zipPath}" ./*`, { cwd: stagingDir, stdio: 'inherit' });
    }

    log('Successfully created publish.zip!');

} catch (error) {
    console.error('[Publish Error]', error);
} finally {
    // 7. Clean up staging directory
    log('Cleaning up staging files...');
    if (fs.existsSync(stagingDir)) {
        fs.rmSync(stagingDir, { recursive: true, force: true });
    }
}
