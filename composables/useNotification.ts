export default function () {
  const toast = useToast()
  const success = (message: string) => {
    toast.add({
      title: 'Sukces!',
      color: 'green',
      description: message,
      icon: 'i-heroicons-check-circle',
      timeout: 5 * 1000,
    })
  }

  return {
    success,
  }
}
