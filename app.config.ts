export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'cool',
    notifications: {
      position: 'top-0 bottom-auto',
    },
    verticalNavigation: {
      base: 'before:rounded-l-none transition-[color] transition-[background] transition-[padding-left]',
      padding: 'px-2 py-3 mb-1.5',
      active: 'text-blue-500 before:bg-primary-100 rounded-none before:rounded-r-md pl-4',
      inactive: 'before:rounded-l-none hover:before:bg-primary-100/50 dark:hover:before:bg-primary-transparent',
      ring: '',
      icon: {
        base: 'w-5 h-5 z-10',
        active: 'text-blue-500 w-[1.35rem] h-[1.35rem]',
        inactive: 'text-gray-400',
      },
    },
    icons: {
      dynamic: true,
    },
    global: true,
  },
})
