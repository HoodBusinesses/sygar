import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

interface EditProfileProps {
  isRTL: boolean
}

export default function EditProfile({ isRTL }: EditProfileProps): JSX.Element {
  return (
    <div
      className={`w-full px-8 py-12 mx-auto max-w-5xl ${isRTL ? 'rtl' : ''}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-800">Update your personal information</h2>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-12">
        <Avatar className="h-24 w-24 border border-gray-300 rounded-full mb-4">
          <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
          <AvatarFallback>JP</AvatarFallback>
        </Avatar>
        <Button
          variant="outline"
          className="text-blue-600 border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <UploadIcon className={`mr-2 h-5 w-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          Change Photo
        </Button>
      </div>

      {/* Form Fields */}
      <div className="space-y-8">
        <h3 className="text-lg font-bold text-gray-700 mb-6">Personal Information</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              defaultValue="John Doe"
              placeholder="Enter your name"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue="john@example.com"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="current-password" className="text-gray-700 font-medium">
              Current Password
            </Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Enter your current password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="new-password" className="text-gray-700 font-medium">
              New Password
            </Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Enter a new password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <div>
            <Label htmlFor="confirm-password" className="text-gray-700 font-medium">
              Confirm New Password
            </Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your new password"
              className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'} mt-12 space-x-4`}>
        <Button
          variant="outline"
          className="text-gray-600 border-gray-300 hover:bg-gray-100 transition-colors rounded-md"
        >
          Cancel
        </Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

function UploadIcon(props): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}
