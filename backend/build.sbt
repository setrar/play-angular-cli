name := """backend"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test
)


val frontEndProjectName = "frontend"
val backEndProjectName = "backend"
val distDirectory = ".." + backEndProjectName + "public/dist"


// Starts: angularCLI build task
lazy val frontendDirectory = baseDirectory {_ /".."/frontEndProjectName}

val buildCmd = "ng build --output-path ../" + backEndProjectName + "/public/dist"

val ngBuild = taskKey[Unit]("ng build task.")
ngBuild := { Process(buildCmd , frontendDirectory.value) ! }
(packageBin in Universal) <<= (packageBin in Universal) dependsOn ngBuild
// Ends.


// Starts: ngServe process when running locally and build actions for production bundle
PlayKeys.playRunHooks <+= frontendDirectory.map(base => ng(base))
// Ends.