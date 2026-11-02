import { StrictMode } from 'react'
import { render } from '@testing-library/react'
import Quill from 'quill'
import Editor from '@/lib/ReactQuillWrapper'

jest.mock('quill', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((element: HTMLDivElement) => {
    const toolbar = document.createElement('div')
    toolbar.className = 'ql-toolbar'
    element.before(toolbar)
    return {
      root: element,
      clipboard: {
        dangerouslyPasteHTML: jest.fn((html: string) => { element.innerHTML = html }),
      },
      on: jest.fn(),
      off: jest.fn(),
      disable: jest.fn(),
    }
  }),
}))

type MockEditor = {
  root: HTMLDivElement
  clipboard: { dangerouslyPasteHTML: jest.Mock }
  on: jest.Mock
  off: jest.Mock
  disable: jest.Mock
}
const latestEditor = () => jest.mocked(Quill).mock.results.at(-1)!.value as MockEditor

beforeEach(() => jest.clearAllMocks())

it('loads fetched HTML without recreating the editor', () => {
  const setContent = jest.fn()
  const { rerender } = render(<Editor content='' setContent={setContent} />)
  const editor = latestEditor()
  rerender(<Editor content='<p>Existing blog</p>' setContent={setContent} />)
  expect(editor.root.innerHTML).toBe('<p>Existing blog</p>')
  expect(Quill).toHaveBeenCalledTimes(1)
  expect(setContent).not.toHaveBeenCalled()
})

it('passes edited HTML to the current callback without resetting the selection', () => {
  const previousCallback = jest.fn()
  const currentCallback = jest.fn()
  const { rerender } = render(<Editor content='' setContent={previousCallback} />)
  const editor = latestEditor()
  rerender(<Editor content='' setContent={currentCallback} />)
  const change = editor.on.mock.calls.find(([event]) => event === 'text-change')![1] as () => void
  editor.root.innerHTML = '<p>Edited content</p>'
  const pasteCount = editor.clipboard.dangerouslyPasteHTML.mock.calls.length
  change()
  expect(currentCallback).toHaveBeenCalledWith('<p>Edited content</p>')
  expect(previousCallback).not.toHaveBeenCalled()
  rerender(<Editor content='<p>Edited content</p>' setContent={currentCallback} />)
  expect(editor.clipboard.dangerouslyPasteHTML).toHaveBeenCalledTimes(pasteCount)
})

it('cleans up listeners and toolbars across Strict Mode remounts', () => {
  const { container, unmount } = render(<StrictMode><Editor content='<p>Blog</p>' setContent={jest.fn()} /></StrictMode>)
  expect(container.querySelectorAll('.ql-toolbar')).toHaveLength(1)
  const editor = latestEditor()
  unmount()
  expect(editor.off).toHaveBeenCalledWith('text-change', expect.any(Function))
  expect(editor.disable).toHaveBeenCalled()
})
