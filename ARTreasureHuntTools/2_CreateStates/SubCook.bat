@ECHO OFF
ECHO ON


MSXSL %CODEE_SETTINGS_PATH% CreateStates.xslt sdk-root=%SDK_PATH% root=%CODEE_ROOT_PATH% > _fileset.xml

CLBCFileSetToFiles _fileset.xml


GOTO END

:END 