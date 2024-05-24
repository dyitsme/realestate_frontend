const Navbar = () => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-sky-500 text-sm py-3">
      <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <a className="flex-none text-l font-semibold text-white" href="#">HomeBudget</a>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          <a className="font-medium text-white" href="/about">About</a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar