import React from 'react'
import { useSPARedirect } from '../hooks/useSPARedirect'

export default function ErrorPage() {
  useSPARedirect()

  return <>
    404
  </>
}
