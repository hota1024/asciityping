import { Ascii, lowerCaseLetters, numbers, upperCaseLetters } from '@/lib/ascii'
import { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useState } from 'react'

type AsciiStatus = Ascii & { priority: number }

type Result = {
  type: 'miss' | 'hit'
  gotKey: string
  ascii: Ascii
}

/**
 * HomePage component.
 */
export const HomePage: NextPage = () => {
  const [ascii, setAscii] = useState<AsciiStatus[]>([
    // ...numbers.map((n) => ({ ...n, priority: 1 })),
    // ...upperCaseLetters.map((n) => ({ ...n, priority: 1 })),
    ...lowerCaseLetters
      .map((n) => ({ ...n, priority: 1 }))
      .slice(0, lowerCaseLetters.length / 2),
  ])
  const [showKey, setShowKey] = useState(false)
  const [showProgress, setShowProgress] = useState(0)

  const [miss, setMiss] = useState(0)
  const [hit, setHit] = useState(0)

  const [current, setCurrent] = useState<AsciiStatus>()
  const [previousResult, setPreviousResult] = useState<Result>()

  const getNextAscii = useCallback(() => {
    const extracted: AsciiStatus[] = []

    ascii.forEach((item) => {
      for (let i = 0; i < item.priority; i++) {
        extracted.push(item)
      }
    })

    return extracted[Math.floor(Math.random() * extracted.length)]
  }, [ascii])

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      const item = ascii.find((i) => i.char === e.key)

      if (!item) {
        return
      }

      if (!current) {
        return
      }

      if (showKey) {
        setMiss((v) => v + 1)
        current.priority += 1
        setPreviousResult({ type: 'miss', gotKey: e.key, ascii: current })
      } else if (item === current) {
        current.priority = Math.max(1, current.priority - 2)
        setHit((v) => v + 1)
        setPreviousResult({ type: 'hit', gotKey: e.key, ascii: current })
      } else {
        current.priority += 1
        setMiss((v) => v + 1)
        setPreviousResult({ type: 'miss', gotKey: e.key, ascii: current })
      }

      setShowKey(false)
      setShowProgress(0)
      setCurrent(getNextAscii())
    },
    [ascii, current, getNextAscii, showKey]
  )

  useEffect(() => {
    setCurrent(getNextAscii())
  }, [getNextAscii])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      e.preventDefault()
      onKey(e)
    }

    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [onKey, current])

  useEffect(() => {
    if (!current) {
      return
    }

    const start = Date.now()
    const id = setInterval(() => {
      const e = Math.min(Date.now() - start, 2500)
      setShowProgress(e / 2500)

      if (e === 2500) {
        setShowKey(true)
        setShowProgress(1)
        clearInterval(id)
      }
    }, 10)

    return () => {
      clearTimeout(id)
    }
  }, [current, showKey])

  return (
    <>
      <Head>
        <title>home - asciityping</title>
      </Head>

      <div className="container">
        <p>press key with following ASCII code</p>
        <div>
          {previousResult &&
            (previousResult.type === 'hit' ? (
              <div className="hit">
                <span className="code">
                  0x{previousResult.ascii.code.toString(16)}
                </span>
                {' = '}
                <span className="char">{`'${previousResult.ascii.char}'`}</span>
              </div>
            ) : (
              <div className="miss">
                <span className="code">
                  0x{previousResult.ascii.code.toString(16)}
                </span>
                {' = '}
                <span className="char">{`'${previousResult.ascii.char}'`}</span>
              </div>
            ))}
        </div>
        <h1>0x{current && current.code.toString(16)}</h1>
        <h2>{showKey && `'${current?.char}'`}</h2>
        {!showKey && <progress value={showProgress * 100} max={100}></progress>}
        <div>hit: {hit}</div>
        <div>miss: {miss}</div>
        <ul>
          {ascii
            .sort((a, b) => b.priority - a.priority)
            .slice(0, 5)
            .map((item) => (
              <li key={item.code}>
                {item.char}: {item.priority}
              </li>
            ))}
        </ul>
      </div>

      <style global jsx>{`
        * {
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }

        .container {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-flow: column;
        }

        .hit {
          color: green;
        }

        .miss {
          color: red;
        }
      `}</style>
    </>
  )
}

export default HomePage
