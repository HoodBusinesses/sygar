import { Card, CardContent, CardHeader } from '@renderer/components/ui/card';
import Profile_Img from '@renderer/assets/images/profile_img.png';
import { useTranslate } from '@renderer/hooks/useTranslate';
import { Button } from '@renderer/components/ui/button';
import { successToast } from '@renderer/utils/notifications/Notification';

export const FileUpload = (): JSX.Element => {
  const { t } = useTranslate();
  return (
    <Card className="">
      <CardHeader className="text-lg text-gray-950 font-bold mb-6">
        {t('registration.basicInfo.fields.logo.label')}
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="flex  justify-start items-center">
          <img
            src={Profile_Img}
            alt="Organization"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col ml-4">
            <p className="text-gray-950 text-sm">Edit Your Logo</p>
            <p className="text-gray-500 font-bold text-sm">Delete Upload</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="flex items-center justify-center p-5">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100  dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <p className="text-gray-400 ">Only .png Files</p>
        </div>
        <Button
          onClick={() => {
            console.log('Logo Upload successfully .');
          }}
          className="custom-button bg-blue-600"
        >
          {t('buttons.save')}
        </Button>
      </CardContent>
    </Card>
  );
};