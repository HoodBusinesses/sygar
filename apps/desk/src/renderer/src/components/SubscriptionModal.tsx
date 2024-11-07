import { Input } from './ui/input'
import { Button, buttonVariants } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { cn } from './ui/lib/utils'
import { FiCalendar } from 'react-icons/fi'

const SubscriptionModal = (): JSX.Element => {
  const handleSubscription = () => {
    console.log('Subscription saved')
  }

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'flex items-center justify-center text-gray-800 hover:bg-gray-200 hover:scale-105 transition-transform w-8 h-8 rounded-full'
        )}
      >
        <FiCalendar className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent className="max-w-lg p-8 bg-white rounded-lg" style={{ boxShadow: 'none' }}>
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Your Subscription</h2>

          <div className="mb-6">
            <p className="text-gray-500 mb-3">Subscription Plan</p>

            <div className="space-y-4">
              {/* Monthly Plan */}
              <label className="flex items-center p-4 rounded-lg cursor-pointer transition">
                <Input
                  type="radio"
                  name="subscription"
                  value="monthly"
                  className="w-5 h-5 text-blue-600"
                />
                <div className="ml-3">
                  <span className="text-gray-800 font-medium">Pay Monthly</span>
                  <span className="block text-gray-500 text-sm">$20 / Month Per Member</span>
                </div>
              </label>

              {/* Annual Plan */}
              <label className="flex items-center p-4 rounded-lg cursor-pointer transition">
                <Input
                  type="radio"
                  name="subscription"
                  value="annually"
                  className="w-5 h-5 text-blue-600"
                  defaultChecked
                />
                <div className="ml-3">
                  <span className="text-gray-800 font-medium">Pay Annually</span>
                  <span className="block text-green-500 text-sm font-medium">Save 20%</span>
                  <span className="block text-gray-500 text-sm">$18 / Month Per Member</span>
                </div>
              </label>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="mb-6">
            <p className="text-gray-500 mb-3">Add Payment Method</p>
            <Input
              placeholder="John Smith"
              className="w-full mb-4 px-4 py-3 bg-gray-100 rounded-md text-gray-800"
            />
            <Input
              placeholder="Card Number"
              className="w-full mb-4 px-4 py-3 bg-gray-100 rounded-md text-gray-800"
            />
            <div className="flex space-x-4">
              <Input
                placeholder="MM / YY"
                className="w-1/2 px-4 py-3 bg-gray-100 rounded-md text-gray-800"
              />
              <Input
                placeholder="CVV"
                className="w-1/2 px-4 py-3 bg-gray-100 rounded-md text-gray-800"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <p className="text-gray-500 text-sm mb-6">
            By Continuing you agree to our{' '}
            <span className="text-gray-900 font-semibold">Terms And Conditions</span>.
          </p>

          {/* Buttons */}
          <div className="flex justify-end">
            <DialogTrigger className="px-4 py-2 text-gray-500 bg-gray-100 border border-gray-300 rounded-md mr-2 hover:bg-gray-200">
              Cancel
            </DialogTrigger>
            <Button
              onClick={handleSubscription}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 font-semibold"
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionModal
