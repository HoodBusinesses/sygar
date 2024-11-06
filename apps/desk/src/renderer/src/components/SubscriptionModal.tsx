import { Input } from './ui/input'
import { Button, buttonVariants } from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { cn } from './ui/lib/utils'
import { FiCalendar } from 'react-icons/fi'


const SubscriptionModal = (): JSX.Element => {
  const handleSubscription = () => {
    console.log('Export')
  }

  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'bg-gray-300 text-gray-800 border border-none'
        )}
      >
        <FiCalendar className="h-4 w-4" />
      </DialogTrigger>

      <DialogContent>
        <div className=" bg-white p-4 items-center justify-center rounded-md shadow-md">
          <div className=" p-4">
            <h2 className="text-xl text-gray-800  font-bold mb-4">Manage Your Subscription</h2>
            <p className="text-gray-400">Subscription Plan</p>
          </div>

          <div className="space-y-4">
            <label className="flex flex-col cursor-pointer">
              <Input
                type="radio"
                name="subscription"
                value="monthly"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-800 font-medium">Pay Monthly</span>
              <span className="text-gray-500 text-sm">$20 / Month per Member</span>
              <Input
                type="radio"
                name="subscription"
                value="annually"
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-gray-800 font-medium">Pay Annually</span>
              <span className="text-green-500 text-sm font-medium">Save 20%</span>
              <span className="text-gray-500 text-sm">$18 / Month per Member</span>
            </label>
          </div>

          <div>
            <p className="text-gray-400">Add payment method</p>
            <Input
              // value={organization?.organization?.rs || ""}
              placeholder={'NAME'}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.name?.message}
            />
            <Input
              // value={organization?.organization?.rs || ""}
              placeholder={'Card Number'}
              className="bg-gray-100 mb-4 text-gray-950"
              // error={errors.name?.message}
            />
            <div className="flex flex-row">
              <Input
                // value={organization?.organization?.rs || ""}
                placeholder={'MM / YY'}
                className="bg-gray-100 mb-4 text-gray-950"
                // error={errors.name?.message}
              />
              <Input
                // value={organization?.organization?.rs || ""}
                placeholder={'CVV'}
                className="bg-gray-100 mb-4 text-gray-950"
                // error={errors.name?.message}
              />
            </div>
            <p className="text-gray-400">
              By Continuing you agree to our{' '}
              <span className="text-gray-900 font-bold">terms and conditions.</span>
            </p>
          </div>

          <div className="flex justify-end">
            <DialogTrigger className="custom-button text-gray-500 hover:bg-gray-200 border border-gray-500 mr-2">
              Cancel
            </DialogTrigger>
            <Button
              onClick={handleSubscription}
              className="custom-button bg-green-500 hover:bg-green-800"
            >
              SAVE
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SubscriptionModal
