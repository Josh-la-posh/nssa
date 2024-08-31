import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Tag, RadioOptions, Logo } from '@/components/Elements';
import {
  Checkbox,
  Editor,
  Input,
  OTPInput,
  Radio,
  Select,
  Switch,
  TextArea,
} from '@/components/Form';
// import { Editor } from '@/components/Form/Editor';
import {
  MainLayout,
  // TopNavBar
} from '@/components/Layout';
import { useNotification, useScrollToPosition, useModal } from '@/hooks';

const ModalContent = ({ onClose }: any) => {
  return (
    <>
      <h1 className="text-lg font-medium leading-6 text-gray-900">Payment successful</h1>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Your payment has been successfully submitted. We&apos;ve sent you an email with all of the
          details of your order.
        </p>
      </div>

      <div className="mt-4">
        <Button
          size="sm"
          type="button"
          className="text-blue-900 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={onClose}
        >
          Got it, thanks!
        </Button>
      </div>
    </>
  );
};
export const ComponentShowCase = () => {
  useScrollToPosition();
  const [samplemodal, showSampleModal] = useModal();
  const [val, setVal] = React.useState('');
  const [activeStepperIndex, setActiveStepperIndex] = React.useState(0);
  const notification = useNotification();

  return (
    <MainLayout>
      <div className="h-screen w-full overflow-hidden p-4">
        {/* <TopNavBar /> */}
        <div className="h-full">
          <div className="flex gap-4 p-4 font-medium">
            <Link to="/">Dashboard</Link>
            <Link to="/auth/login">Login</Link>
          </div>
          {/* <div className="relative">
          <Editor name="Editor" onChange={(e) => console.log(e.target)} />
        </div> */}

          <div className={clsx('h-full p-4')}>
            <section className="my-6">
              <div className="flex flex-wrap gap-8">
                <div className="rounded-md border border-gray-300 p-4">
                  <h3 className="pb-2 text-lg font-semibold">Logo</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Logo variant="primary" />
                    <Logo variant="primary-text" />
                    <Logo variant="white" />
                    <Logo variant="white-text" />
                  </div>
                </div>
                <div className="w-full max-w-md rounded-md border border-gray-300 p-4">
                  <h3 className="pb-2 text-lg font-semibold">Stepper</h3>
                  {/* <Stepper
                    size="md"
                    activeIndex={activeStepperIndex}
                    items={[
                      { title: 'First Step' },
                      { title: 'Second Step' },
                      { title: 'Third Step' },
                    ]}
                  /> */}
                  <div className="mt-4 flex w-full items-center justify-between px-4">
                    <Button
                      disabled={activeStepperIndex === 1}
                      size="sm"
                      onClick={() => setActiveStepperIndex(activeStepperIndex - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      disabled={activeStepperIndex === 3}
                      size="sm"
                      onClick={() => setActiveStepperIndex(activeStepperIndex + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="my-6">
              <h3 className="pb-2 text-lg font-semibold">Buttons</h3>
              <div className="flex flex-wrap gap-8">
                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Primary Buttons</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="filled" color="primary">
                      Button
                    </Button>
                    <Button variant="outlined" isLoading={true} color="primary">
                      Button
                    </Button>
                    <Button variant="text" color="primary">
                      Button
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Primary Buttons</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="filled" isLoading={true} color="primary">
                      Button
                    </Button>
                    <Button variant="outlined" isLoading={true} color="primary">
                      Button
                    </Button>
                    <Button variant="text" isLoading={true} color="primary">
                      Button
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="my-6">
              <h3 className="pb-2 text-lg font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-8">
                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Success Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <Tag color="success" variant="filled" label="Success" />
                    <Tag color="success" variant="outlined" label="Success" />
                    <Tag color="success" variant="text" label="Success" />
                  </div>
                </div>
                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Error Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <Tag color="error" variant="filled" label="Error" />
                    <Tag color="error" variant="outlined" label="Error" />
                    <Tag color="error" variant="text" label="Error" />
                  </div>
                </div>
                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Warning Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    <Tag color="warning" variant="filled" label="Warning" />
                    <Tag color="warning" variant="outlined" label="Warning" />
                    <Tag color="warning" variant="text" label="Warning" />
                  </div>
                </div>
              </div>
            </section>

            <section className="my-6">
              <h3 className="pb-2 text-lg font-semibold">Notifications</h3>
              <div className="flex flex-wrap gap-8">
                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Snack Bar</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="text"
                      size="sm"
                      color="primary"
                      onClick={() =>
                        notification.show({
                          title: 'Info',
                          type: 'info',
                          message: 'This is a info type message',
                        })
                      }
                    >
                      Info
                    </Button>
                    <Button
                      size="sm"
                      variant="text"
                      color="primary"
                      onClick={() =>
                        notification.show({
                          title: 'Warning',
                          type: 'warning',
                          message: 'This is a warning type message',
                        })
                      }
                    >
                      Warning
                    </Button>
                    <Button
                      size="sm"
                      variant="text"
                      color="primary"
                      onClick={() =>
                        notification.show({
                          title: 'Error',
                          type: 'error',
                          message: 'This is a error type message',
                        })
                      }
                    >
                      Error
                    </Button>
                    <Button
                      size="sm"
                      variant="text"
                      color="primary"
                      onClick={() =>
                        notification.show({
                          title: 'Success',
                          type: 'success',
                          message: 'This is a success type message',
                        })
                      }
                    >
                      Success
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Modal</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="text"
                      color="primary"
                      onClick={() => {
                        showSampleModal({
                          title: 'hello',
                          showModal: (onClose) => <ModalContent onClose={onClose} />,
                          options: {
                            className: 'border-t-2 border-status-error ',
                            position: 'top',
                          },
                        });
                      }}
                    >
                      Open Modal
                    </Button>
                    {samplemodal}
                  </div>
                </div>
              </div>
            </section>

            <section className="my-6">
              <h3 className="pb-2 text-lg font-semibold">Form</h3>
              <div className="flex flex-wrap gap-8">
                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Input</h4>
                  <div className="flex flex-wrap items-start gap-2">
                    <Input placeholder="Enter Username" />
                    <Input type="password" placeholder="Password" />
                    <OTPInput
                      value={val}
                      length={5}
                      type="numeric"
                      name="otp-ipurt"
                      onChange={(v) => {
                        setVal(v.target.value);
                      }}
                    />
                    <TextArea placeholder="Enter Username" />
                    <Editor />
                  </div>
                </div>
                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Select</h4>
                  <div className="flex flex-wrap gap-2">
                    <Select
                      className="w-40"
                      placeholder="Enter Username"
                      options={[
                        { label: 'Option 1', key: 'option1', value: 'option1' },
                        { label: 'Option 2', key: 'option2', value: 'option2' },
                      ]}
                    />
                    <Select
                      className="w-40"
                      placeholder="Type to search"
                      multiple
                      options={[
                        { label: 'Option 1', key: 'option1', value: 'option1' },
                        { label: 'Option 2', key: 'option2', value: 'option2' },
                      ]}
                    />
                    <Select
                      className="w-40"
                      placeholder="Type to search"
                      canSearch
                      options={[
                        { label: 'Option 1', key: 'option1', value: 'option1' },
                        { label: 'Option 2', key: 'option2', value: 'option2' },
                      ]}
                    />
                    <Select
                      className="w-40"
                      multiple
                      canSearch
                      placeholder="Type to search"
                      options={[
                        { label: 'Option 1', key: 'option1', value: 'option1' },
                        { label: 'Option 2', key: 'option2', value: 'option2' },
                      ]}
                    />
                  </div>
                </div>
                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Switches</h4>
                  <div className="flex flex-wrap gap-4">
                    <Switch label="Toggle" />
                    <Checkbox label="Checkbox" />
                    <Radio name="if" value={'jhjhj'} id="waht" inLabel label="Radio 1" />
                    <Radio inLabel name="if" value={'jhjj'} id="what" label="Radio 2" />
                  </div>
                </div>

                <div className="rounded-md border border-gray-300 p-4">
                  <h4 className="pb-2 text-base font-medium">Radio Options</h4>
                  <div className="flex flex-wrap items-center gap-4">
                    <RadioOptions
                      name="Question 1"
                      value={'jhjhj'}
                      id="waht"
                      options={[
                        { label: 'Option 1', value: 'option1' },
                        { label: 'Option 2', value: 'option2' },
                        { label: 'Option 3', value: 'option3' },
                        { label: 'Option 4', value: 'option4' },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
