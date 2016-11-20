<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xsl:output method="xml" indent="yes" />
  <xsl:param name="root" />
  <xsl:param name="sdk-root" />
  <xsl:variable name="odxml" select="/" />
  <xsl:variable name="settings" select="/" />
  <xsl:variable name="entities" select="document(concat($sdk-root, 'GoogleData/AdditionalResources/Entities.csv.xml'))" />
  <xsl:variable name="project-name" select="$settings//Setting[Name = 'ProjectName']/Value" />
  <xsl:variable name="app-states" select="document(concat($sdk-root, 'GoogleData/AdditionalResources/AppStates.csv.xml'))" />



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
            <xsl:value-of select="$sdk-root"  />../ARTreasureHunt/www/js/app.derived.js
          </RelativePath>
          <OverwriteMode>Always</OverwriteMode>
            <xsl:element name="FileContents" xml:space="preserve">
            <xsl:for-each select="$app-states//AppState">
   .state('<xsl:value-of select="Name" />', {
      url: '/newuser',
      views: {
        'menuContent': {
          templateUrl: 'templates/newuser.html',
          controller: 'NewUserController'
        }
      },
      resolve: {
        'currentAuth': ['Auth', function(Auth) {
          // $requireSignIn returns a promise so the resolve waits for it to complete
          // If the promise is rejected, it will throw a $stateChangeError (see above)
          return Auth.$requireSignIn();
        }]
      }
    })
    </xsl:for-each>
            </xsl:element>
        </FileSetFile>
      </FileSetFiles>
    </FileSet>
  </xsl:template>

</xsl:stylesheet>
