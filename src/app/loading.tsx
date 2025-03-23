import Image from 'next/image'

export default function Loading() {
  return (
    <div className="h-screen bg-white">
      <div className="flex h-full items-center justify-center">
        <Image
          alt="Loading"
          className="h-16 w-16"
          width={100}
          height={100}
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
        ></Image>
      </div>
    </div>
  )
}
