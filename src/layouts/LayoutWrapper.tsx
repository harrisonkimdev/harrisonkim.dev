import NavMenus from "./(nav)/NavMenus"
import TopArrow from "@/components/TopArrow"
// import Footer from "@/layouts/Footer"

type TWrapperProps = {
  children: React.ReactNode
}

const Wrapper = ({ children } : TWrapperProps) => {
  return (
    <div>
      <NavMenus />      
      
      <main className="
        flex flex-col items-center w-full min-h-screen bg-black
      ">
        <div className="max-w-5xl mt-14 md:mt-20 pt-14 px-6">
          { children }
        </div>
      </main>

      <TopArrow />

      {/* <Footer /> */}
    </div>
  )
}

export default Wrapper