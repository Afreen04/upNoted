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
function configureStates($stateProvider) 
{
   $stateProvider
<xsl:for-each select="$app-states//AppState">
   .state('<xsl:value-of select="State" />', {    // <xsl:value-of select="Description" />
      url: '<xsl:value-of select="Url" />',
      <xsl:choose>
      <xsl:when test="normalize-space(IsAbstract) = 'TRUE'">
      abstract: true,
      templateUrl: '<xsl:value-of select="TemplateUrl" />',
      resolve: {
        function(User) {
          return User;
        }
      }</xsl:when>

      <xsl:otherwise>
        views: {
        'menuContent': {
          templateUrl: '<xsl:value-of select="TemplateUrl" />',
          controller: '<xsl:value-of select="Controller" />'
        }
      }

      </xsl:otherwise>
      </xsl:choose>
    
    })
    </xsl:for-each>
}
            </xsl:element>
        </FileSetFile>
          <xsl:for-each select="$app-states//AppState">
              <FileSetFile>
                  <RelativePath>
                      <xsl:value-of select="$sdk-root"  /><xsl:text>../ARTreasureHunt/www/</xsl:text><xsl:value-of select="TemplateUrl" />
                  </RelativePath>
                  <OverwriteMode>Never</OverwriteMode>
                  <xsl:element name="FileContents" xml:space="preserve">
&lt;ion-view title="<xsl:value-of select="Name" />">
  <ion-nav-buttons side="left">
    <button menu-toggle="left" class="button button-icon icon ion-navicon"></button>
  </ion-nav-buttons>

  <ion-nav-buttons side="right">
    <span class="icon-label">15%</span><i class="icon ion-cash balanced top-icon"></i>
    <span class="icon-label">3</span><i class="icon ion-heart assertive top-icon"></i>
  </ion-nav-buttons>

  <ion-content class="has-header">

  <!-- this is where the page content goes -->

  </ion-content>
&lt;/ion-view>
                  </xsl:element>
              </FileSetFile>
          </xsl:for-each>
      </FileSetFiles>
    </FileSet>
  </xsl:template>
   

</xsl:stylesheet>
