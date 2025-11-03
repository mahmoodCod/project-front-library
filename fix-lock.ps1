# Script to fix Next.js lock issue
Write-Host "Fixing Next.js lock issue..." -ForegroundColor Yellow

# Stop all Node.js processes (except Cursor)
Write-Host "Stopping Node.js processes..." -ForegroundColor Cyan
Get-Process | Where-Object { $_.ProcessName -eq "node" -and $_.Path -notlike "*cursor*" } | 
    ForEach-Object { 
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
        Write-Host "  Stopped process $($_.Id)" -ForegroundColor Green
    }

# Remove lock file and dev directory
Write-Host "Removing lock files..." -ForegroundColor Cyan
Remove-Item -Path ".\.next\dev\lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".\.next\dev" -Recurse -Force -ErrorAction SilentlyContinue
Write-Host "  Lock files removed" -ForegroundColor Green

Write-Host "Done! You can now run 'npm run dev'" -ForegroundColor Green

