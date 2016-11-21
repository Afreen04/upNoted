ECHO Create Hunt Data

CD 1_CreateHuntData
CALL SubCook.bat
CD %SDK_PATH%..\ARTreasureHuntTools


CD 2_CreateStates
CALL SubCook.bat
CD %SDK_PATH%..\ARTreasureHuntTools


CD 3_CreateDocs
CALL SubCook.bat
CD %SDK_PATH%..\ARTreasureHuntTools
