<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:msxsl="urn:schemas-microsoft-com:xslt" exclude-result-prefixes="msxsl" xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xsl:output method="xml" indent="yes" />
    <xsl:param name="root" />
    <xsl:param name="sdk-root" />
    <xsl:variable name="odxml" select="/" />
    <xsl:variable name="settings" select="/" />
    <xsl:variable name="entities" select="document(concat($sdk-root, 'GoogleData/AdditionalResources/Entities.csv.xml'))" />
    <xsl:variable name="project-name" select="$settings//Setting[Name = 'ProjectName']/Value" />
    <xsl:variable name="app-states" select="document(concat($sdk-root, 'GoogleData/AdditionalResources/AppStates.csv.xml'))" />
    <xsl:variable name="hunts" select="document(concat($sdk-root, 'HuntData/Hunts.xml'))" />

    <xsl:variable name="sample-hunt" select="$hunts//TreaureHunt[position() = 2]" />

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
                        <xsl:value-of select="$sdk-root"  />
                        <xsl:text>Docs/Index.html</xsl:text>
                    </RelativePath>
                    <OverwriteMode>Always</OverwriteMode>
                    <xsl:element name="FileContents" xml:space="preserve">
<html>
<head>
    <title>Derived Docs AR Treasure Hunt</title>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    </head>
   <body>
   <h1>Augmented Reality Treasure Hunt</h1>
   <p>
   This is a high level summary of the Augmented Reality Treasure Hunt which was
   created Olivia, Andrew, Theo, Davi at the 2016 Build Madison Event.
   </p>
   <h2>User Experience</h2>
   <p>
    A typical game will involve the user following this general sequence.
    </p>
    
    <ol>
    <xsl:for-each select="$app-states//AppState[StateType = 'GameState']">
    <li>
    &lt;a href="AppState_<xsl:value-of select="Name"/>.html">
    <xsl:value-of select="Name"/>&lt;/a>
    <div>
    <small>
        <xsl:value-of select="Description"/>
        <br />
        <br />
    </small>
    </div>
    </li></xsl:for-each>
    </ol>
       <h2>System Views</h2>
   <p>
    While not in the game, a user might also visit these areas.
    </p>
    
    <ol>
    <xsl:for-each select="$app-states//AppState[StateType != 'GameState']">
    <li>
    &lt;a href="AppState_<xsl:value-of select="Name"/>.html">
    <xsl:value-of select="Name"/>&lt;/a>
    <div>
    <small>
        <xsl:value-of select="Description"/>
        <br />
        <br />
    </small>
    </div>
    </li></xsl:for-each>
    </ol>



   </body>
</html>
            </xsl:element>
                </FileSetFile>
                <xsl:for-each select="$app-states//AppState">
                    <FileSetFile>
                        <RelativePath>
                            <xsl:value-of select="$sdk-root"  />
                            <xsl:text>Docs/AppState_</xsl:text>
                            <xsl:value-of select="Name" />
                            <xsl:text>.html</xsl:text>
                        </RelativePath>
                        <OverwriteMode>Always</OverwriteMode>
                        <xsl:element name="FileContents" xml:space="preserve"><html>
<head>
    <title>App State: <xsl:value-of select="Name"/></title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous" />
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

    </head>
   <body>
   <h1><xsl:value-of select="Name"/> "app state"</h1>
   <p>
    <xsl:value-of select="Description"/>
    <xsl:variable name="previous"  select="preceding-sibling::*[1][StateType = 'GameState']" />
    <xsl:variable name="next"  select="following-sibling::*[StateType = 'GameState']" />
     <xsl:element name="div" xml:space="default">
   
   <xsl:if test="count($previous)">
   <a class="btn btn-default">
   <xsl:attribute name="href">AppState_<xsl:value-of select="$previous/Name"/>.html</xsl:attribute>
   &lt;&lt;  <xsl:value-of select="$previous/Name"/></a> | 
   </xsl:if>
   <a class="btn btn-default" href="Index.html">All States</a> 
   <xsl:if test="count($next)">
   | <a class="btn btn-default">
   <xsl:attribute name="href">AppState_<xsl:value-of select="$next/Name"/>.html</xsl:attribute>
   <xsl:value-of select="$next/Name"/> &gt;&gt;</a>
   </xsl:if>
   </xsl:element>
   

   </p>

   <xsl:choose>
   <xsl:when test="Name = 'Login'">
<p>Currently all Treasure Hunt users will be identified by authenticating through a Google Account.</p>
   </xsl:when>
   <xsl:when test="Name = 'Newuser'">
 <xsl:for-each select="$sample-hunt">
   <xsl:call-template name="characters" />

   </xsl:for-each>
</xsl:when>
<xsl:when test="Name = 'Puzzle'">
 <xsl:for-each select="$sample-hunt">
      <xsl:call-template name="puzzles" />
   </xsl:for-each>
</xsl:when>
   <xsl:when test="Name = 'Story'">
   <div style="padding: 3em;">
   <div style="font-weight: bold;">
   Example Back Story:
   </div>
     <xsl:value-of select="$sample-hunt/Description"/>
     </div>
   </xsl:when>
   </xsl:choose>
    
   </body>
</html>

                  </xsl:element>
                    </FileSetFile>
                </xsl:for-each>
            </FileSetFiles>
        </FileSet>
    </xsl:template>

    <xsl:template name="characters">
        <xsl:param name="hunt-name" select="$sample-hunt/Name" />


       <div style="clear: both" />
   <h2>Characters</h2>

   <xsl:for-each select=".//Characters">
   <div style="clear: both"></div>
  <h3><xsl:value-of select="Name"/></h3>
      &lt;img style="float: left; width: 12em; padding: 0.5em;" src="../HuntData/<xsl:value-of select="$hunt-name"/>/AvatarIcons/<xsl:value-of select="IconName"/>" />
      <xsl:value-of select="Bio"/>
      <p>
      <span style="font-weight: bold">VICE: </span> <xsl:value-of select="Vice"/></p>
   </xsl:for-each>

    </xsl:template>

    <xsl:template name="puzzles">
        <xsl:param name="hunt-name" select="$sample-hunt/Name" />
        <xsl:element name="div">
            <div style="clear: both"></div>
            <h3>
                <xsl:value-of select="$hunt-name"/>
            </h3>
            <p>
            <span style="font-weight: bold">Treasure Hunt Back Story: </span>
                <xsl:value-of select="$sample-hunt/Description" />
            </p>
            <p>
                These are the puzzles for a sample hunt (<a href="../HuntData/Hunts.xml.json" target="_blank">json</a>)
                included in the SDK.
            </p>

            <xsl:for-each select=".//Puzzles">
                <div style="min-height: 1em; clear: both">
                    &#32;
                </div>
                <h4>
                    Puzzle <xsl:value-of select="position()"/>  - <xsl:value-of select="LocationName"/>
                </h4>
                &lt;img style="float: left; width: 12em; padding: 0.5em;" src="../HuntData/<xsl:value-of select="$hunt-name"/>/PuzzleImages/<xsl:value-of select="PhotoName"/>" />

                <p>
                    <span style="font-weight: bold">The Story: </span>
                    <xsl:value-of select="Story" />
                </p>

                <span style="font-weight: bold">A possible hint: </span> <xsl:value-of select="Hint"/>

                <p>
                    After figuring out the puzzle, and verifying that they are at '<xsl:value-of select="LocationName"/>',
                    they have  to answer a question.
                </p>

                <p>
                    <span style="font-weight: bold">The Question: </span>
                    <xsl:value-of select="Question"/>
                </p>
                <span style="font-weight: bold">Answer: </span> <xsl:value-of select="Answer"/>
                <hr style="margin: 1em;" />

            </xsl:for-each>
        </xsl:element>
    </xsl:template>


</xsl:stylesheet>
