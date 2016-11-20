@ECHO OFF
ECHO ON


MSXSL %CODEE_SETTINGS_PATH% CreateHuntData.xslt sdk-root=%SDK_PATH% root=%CODEE_ROOT_PATH% > _fileset.xml

CLBCFileSetToFiles _fileset.xml

CLBCXmlToJson %SDK_PATH%HuntData\Hunts.xml


GOTO END

:END 