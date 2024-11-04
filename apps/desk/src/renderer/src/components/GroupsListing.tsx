import React from 'react'
import { Button } from './ui/button'

interface GroupsListingModalProps {
  onClose: () => void
}

export default function GroupsListing(props: GroupsListingModalProps): JSX.Element {
  return (
    <div>
      <Button className="custom-button bg-blue-600 hover:bg-blue-500" onClick={props.onClose}>
        Close
      </Button>
    </div>
  )
}
