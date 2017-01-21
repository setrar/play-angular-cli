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

// Starts: angularCLI build task
val ngBuild = taskKey[Unit]("ng build task.")
ngBuild := { Process("ng build --output-path ../backend/public/dist", file("../frontend")) ! }
(packageBin in Universal) <<= (packageBin in Universal) dependsOn ngBuild
// Ends.
