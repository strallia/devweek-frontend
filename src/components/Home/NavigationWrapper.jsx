function NavButton({ text, styles }) {
  return (
    <button
      className={`${styles} hover:bg-gray-100 hover:cursor-pointer hover:rounded-2xl pr-2.5 pl-2.5 h-min`}
    >
      {text}
    </button>
  );
}

function NavigationWrapper() {
  return (
    <div className="grid h-full grid-rows-[50px_1fr_50px]">
      <nav className="flex gap-5 p-2.5 bg-gray-200 items-center">
        <NavButton text="profile" styles="mr-auto" />
        <NavButton text="notifs" />
        <NavButton text="settings" />
      </nav>
      <p>main</p>

      <nav className="flex gap-5 p-2.5 justify-center bg-gray-200 items-center">
        <NavButton text="home" />
        <NavButton text="new" />
        <NavButton text="expenses" />
      </nav>
    </div>
  );
}

export default NavigationWrapper;
