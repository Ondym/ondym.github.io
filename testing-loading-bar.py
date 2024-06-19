import time
import sys

def loading_bar(total):
    for i in range(total + 1):
        percent = (i / total) * 100
        bar = '#' * (i * 50 // total)
        spaces = ' ' * (50 - len(bar))
        sys.stdout.write(f'\r{int(percent)}% [{bar}{spaces}]')
        sys.stdout.flush()
        time.sleep(0.1)  # Simulate work by sleeping for a short period

# Example usage
loading_bar(100)
