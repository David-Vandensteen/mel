from cx_Freeze import setup, Executable
base = None
executables = [Executable("padwatcher.py", base=base)]
packages = ["inputs"]
options = {
    'build_exe': {
        'packages':packages,
    },
}
setup(
    name = "padwatcher",
    options = options,
    version = "1.0",
    description = 'padwatcher',
    executables = executables
)