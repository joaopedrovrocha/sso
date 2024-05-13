import { Disclosure } from '@headlessui/react'
import { PropsWithChildren } from 'react'
import { usePlatform } from '../context/platform.context'

export function AppLayout({ children }: PropsWithChildren) {
  const { platform } = usePlatform()

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="border-b border-gray-200 bg-white">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                  <div className="flex">
                    <div className="flex flex-shrink-0 items-center">
                      <img
                        className="block h-14 w-auto lg:hidden"
                        src={platform?.logo}
                        alt="Your Company"
                      />
                      <img
                        className="hidden h-14 w-auto lg:block"
                        src={platform?.logo}
                        alt="Your Company"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <p>
                Seja bem vindo à loja
              </p>
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900"> {platform?.name}</h1>
            </div>
          </header>
          <main className='mt-5'>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
