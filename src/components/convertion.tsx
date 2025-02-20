import Audio from '../assets/defaultAlarm.mp3'

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

export const convertToFileUrl = (base64: string, fileName: string = "audio.mp3"): string => {
  if (!base64 || base64.trim() === "") {
    return Audio
  }

  try {
    const byteString = atob(base64.split(",")[1])
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]

    const arrayBuffer = new ArrayBuffer(byteString.length)
    const uint8Array = new Uint8Array(arrayBuffer)

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i)
    }

    const file = new File([arrayBuffer], fileName, { type: mimeString })
    return URL.createObjectURL(file)
  } catch (error) {
    console.error("Invalid Base64 string:", error)
    return ""
  }


}
