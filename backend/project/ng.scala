import java.io.File
import java.net.InetSocketAddress

import play.sbt.PlayRunHook
import sbt.Process

object ng {
  def apply(base: File): PlayRunHook = {

    object ngServe extends PlayRunHook {

      var process: Option[Process] = None // This is really ugly, how can I do this functionally?

      override def afterStarted(addr: InetSocketAddress): Unit = {
        process = Some (Process( "ng serve --watch " , base).run)
      }

      override def afterStopped(): Unit = {
        process.foreach(_.destroy)
        process = None
      }
    }

    ngServe
  }
}