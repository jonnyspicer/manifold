import React, { Fragment } from 'react'
import { LinkIcon } from '@heroicons/react/outline'
import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Contract } from 'common/contract'
import { copyToClipboard } from 'web/lib/util/copy'
import { contractPath } from 'web/lib/firebase/contracts'
import { ENV_CONFIG } from 'common/envs/constants'
import { ToastClipboard } from 'web/components/toast-clipboard'

function copyContractUrl(contract: Contract) {
  copyToClipboard(`https://${ENV_CONFIG.domain}${contractPath(contract)}`)
}

export function CopyLinkButton(props: {
  contract: Contract
  buttonClassName?: string
  toastClassName?: string
}) {
  const { contract, buttonClassName, toastClassName } = props

  return (
    <Menu
      as="div"
      className="relative z-10 flex-shrink-0"
      onMouseUp={() => copyContractUrl(contract)}
    >
      <Menu.Button
        className={clsx(
          'btn btn-xs border-2 border-green-600 bg-white normal-case text-green-600 hover:border-green-600 hover:bg-white',
          buttonClassName
        )}
      >
        <LinkIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
        Copy link
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items>
          <Menu.Item>
            <ToastClipboard className={toastClassName} />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
