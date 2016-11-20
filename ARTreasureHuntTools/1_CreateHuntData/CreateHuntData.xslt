<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xsl:output method="xml" indent="yes" />
  <xsl:param name="root" />
  <xsl:param name="sdk-root" />
  <xsl:variable name="odxml" select="/" />
  <xsl:variable name="settings" select="/" />
  <xsl:variable name="entities" select="document(concat($sdk-root, 'GoogleData/AdditionalResources/Entities.csv.xml'))" />
  <xsl:variable name="project-name" select="$settings//Setting[Name = 'ProjectName']/Value" />
  <xsl:variable name="static-data" select="document(concat($sdk-root, 'StaticData/ExampleData/StaticData.xml'))" />



  <xsl:template match="@*|node()">
    <xsl:copy>
      <xsl:apply-templates select="@*|node()" />
    </xsl:copy>
  </xsl:template>

  <xsl:template match="/">
    <FileSet>
      <FileSetFiles>
        <FileSetFile>
          <RelativePath>
            <xsl:value-of select="$sdk-root"  />HuntData/Hunts.xml
          </RelativePath>
          <OverwriteMode>Always</OverwriteMode>
          <FileContents>
            <HuntData>
              <xsl:for-each select="$static-data//TreasureHunt">
                <TreaureHunt>
                  <xsl:copy-of select="*" />
                    <xsl:variable name="characters" select="document(concat($sdk-root, 'GoogleData/AdditionalResources/', Name, 'Characters.csv.xml'))" />
                    <xsl:variable name="locations" select="document(concat($sdk-root, 'GoogleData/AdditionalResources/', Name, 'Locations.csv.xml'))" />
                    <xsl:variable name="puzzles" select="document(concat($sdk-root, 'GoogleData/AdditionalResources/', Name, 'Puzzles.csv.xml'))" />
                  <xsl:for-each select="$characters/*/*">
                    <Character>
                      <xsl:copy-of select="*"/>
                    </Character>
                  </xsl:for-each>
                  <xsl:for-each select="$locations/*/*">
                    <Location>
                      <xsl:copy-of select="*"/>
                    </Location>
                  </xsl:for-each>
                  <xsl:for-each select="$puzzles/*/*">
                    <Puzzle>
                      <xsl:copy-of select="*"/>
                    </Puzzle>
                  </xsl:for-each>
                </TreaureHunt>
              </xsl:for-each>
            </HuntData>
          </FileContents>
        </FileSetFile>
      </FileSetFiles>
    </FileSet>
  </xsl:template>

</xsl:stylesheet>
