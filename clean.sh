#!/bin/bash
**/
 *
 * #Author: Ayoub
 * #Bash script: Cleaning my project
 * #checking with echo first
 *
 *
 */

# Remove node_modules directories
find ./backend ./frontend -name "node_modules" -type d -exec rm -rf {} +

# Remove dist and build directories
find ./backend ./frontend -name "dist" -type d -exec rm -rf {} +
find ./backend ./frontend -name "build" -type d -exec rm -rf {} +

# Remove example and test directories
find ./backend ./frontend -name "example" -type d -exec rm -rf {} +
find ./backend ./frontend -name "test" -type d -exec rm -rf {} +
find ./backend ./frontend -name "__tests__" -type d -exec rm -rf {} +

# Remove __pycache__ directories
find ./backend ./frontend -name "__pycache__" -type d -exec rm -rf {} +

# Remove log files
find ./backend ./frontend -name "*.log" -type f -exec rm -f {} +

# Remove temporary backup files
find ./backend ./frontend -name "*~" -type f -exec rm -f {} +

echo "Cleanup complete!"
