$ErrorActionPreference = 'Stop'
$projectRoot = $PSScriptRoot
$stage = Join-Path $projectRoot ('_deploy/infinityfree-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
New-Item -ItemType Directory -Path $stage -Force | Out-Null
Get-ChildItem -LiteralPath (Join-Path $projectRoot 'frontend/dist') -Force | Copy-Item -Destination $stage -Recurse
Copy-Item -LiteralPath (Join-Path $projectRoot 'backend') -Destination $stage -Recurse
$utf8 = New-Object Text.UTF8Encoding($false)
$envText = @'
DB_HOST=sql205.infinityfree.com
DB_NAME=if0_42943225_TechWithHussain
DB_USER=if0_42943225
DB_PASS=REPLACE_WITH_YOUR_NEW_MYSQL_PASSWORD
DB_CHARSET=utf8mb4
SMTP_PASSWORD=
'@
$randomBytes = New-Object byte[] 48
$rng = [Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($randomBytes)
$rng.Dispose()
$envText += "`nJWT_SECRET=" + [Convert]::ToBase64String($randomBytes) + "`n"
[IO.File]::WriteAllText((Join-Path $stage '.env'), $envText, $utf8)
$htaccessPath = Join-Path $stage '.htaccess'
$htaccess = [IO.File]::ReadAllText($htaccessPath)
$htaccess = $htaccess.Replace('    RewriteRule ^api/(.*)$ backend/api/$1 [L,QSA]', "    RewriteRule ^api/(.*)$ backend/api/`$1 [L,QSA]`n    RewriteRule ^uploads/(.*)$ backend/uploads/`$1 [L,QSA]")
$htaccess += @'

# Keep deployment credentials private.
<FilesMatch "^\.env$">
    Require all denied
</FilesMatch>
'@
[IO.File]::WriteAllText($htaccessPath, $htaccess, $utf8)
# Do not retain the legacy hardcoded database password in this package.
$dbPath = Join-Path $stage 'backend/api/config/db.php'
$dbCode = [IO.File]::ReadAllText($dbPath)
$dbCode = [regex]::Replace($dbCode, "(?m)^define\('DB_PASS'.*$", "define('DB_PASS', getenv('DB_PASS') ?: '');")
[IO.File]::WriteAllText($dbPath, $dbCode, $utf8)
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zipPath = Join-Path $projectRoot ('INFINITYFREE_UPLOAD-' + (Get-Date -Format 'yyyyMMdd-HHmmss') + '.zip')
$zip = [IO.Compression.ZipFile]::Open($zipPath, [IO.Compression.ZipArchiveMode]::Create)
try {
    Get-ChildItem -LiteralPath $stage -Recurse -Force -File | ForEach-Object {
        $relative = $_.FullName.Substring($stage.Length + 1).Replace('\', '/')
        [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $relative, [IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
} finally { $zip.Dispose() }
Write-Output "Created: $zipPath"
Write-Output 'After extraction, edit .env DB_PASS in the hosting file manager before testing.'
