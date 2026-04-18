#!/bin/bash
# Read all Apple Notes and output as JSON
osascript << 'APPLESCRIPT'
tell application "Notes"
    set output to ""
    repeat with aNote in notes
        set noteName to name of aNote
        set noteBody to body of aNote
        set output to output & "=== " & noteName & " ===" & return & noteBody & return & return
    end repeat
    return output
end tell
APPLESCRIPT
