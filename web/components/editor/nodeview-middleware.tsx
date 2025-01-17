import { Extensions } from '@tiptap/core'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import clsx from 'clsx'
import { getField } from './utils'

export const nodeViewMiddleware = (extensions: Extensions) => {
  return extensions.map((e) => {
    const renderReact = getField(e, 'renderReact')
    if (renderReact) {
      return e
        .extend({
          addNodeView: () =>
            ReactNodeViewRenderer((props: any) => (
              <NodeViewWrapper className={clsx(e.name, 'contents')}>
                {renderReact(props.node.attrs, props.children)}
              </NodeViewWrapper>
            )),
        })
        .configure(e.options)
    } else {
      return e
    }
  })
}
