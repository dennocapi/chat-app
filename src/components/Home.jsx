import { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Menu, Transition } from "@headlessui/react";
import moment from "moment";
import {
  Bars3BottomLeftIcon,
  ClockIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/20/solid";

const navigation = [
  { name: "Home", href: "/home", icon: HomeIcon, current: true },
  { name: "Exit", href: "/", icon: ClockIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [scroll, setScroll] = useState(false);
  const [loadMessage, setLoadMessage] = useState(false)

  const navigate = useNavigate();

  const bottomRef = useRef(null);

  useEffect(() => {
    setInterval(loadMessages, 2000)
  }, []);

  useEffect(() => {
    if (window.sessionStorage.length === 0) {
      navigate("/");
    }
    setUser(JSON.parse(window.sessionStorage.users)[0].userName);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [scroll, loadMessage]);

  const onSubmit = () => {
    const newMessage = {
      userName: user,
      message: message,
      date: Date(),
    };

    messages.push(newMessage);
    localStorage.setItem("messages", JSON.stringify(messages));
    setMessage("");
    setLoadMessage(!loadMessage)
  };

  const loadMessages = () => {
    let chats = localStorage.getItem("messages");

    if (chats) {
      chats = JSON.parse(chats);
      setMessages(chats);

      const participants = [];
      chats.forEach((chat) => participants.push(chat.userName));
      let uniqueParticipants = [...new Set(participants)];
      setParticipants(uniqueParticipants);
      setScroll(true);
    }
  };

  return (
    <>
      <div className="flex min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800 pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex flex-shrink-0 items-center px-4">
                    <a href="/" className="text-white">
                      <span className="sr-only">Chat app</span>
                      <span className="pt-3 font-bold text-lg">Connect!</span>
                    </a>
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="px-2">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-300"
                                  : "text-gray-400 group-hover:text-gray-300",
                                "mr-4 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64">
          {/* Sidebar component */}
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex h-16 flex-shrink-0 items-center bg-gray-900 px-4">
              <div className="text-lg font-bold text-white">Connect!</div>
            </div>
            <div className="flex flex-1 flex-col overflow-y-auto bg-gray-800">
              <nav className="flex-1 px-2 py-4">
                <div className="space-y-1">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? "text-gray-300"
                            : "text-gray-400 group-hover:text-gray-300",
                          "mr-3 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex w-0 flex-1 flex-col lg:pl-64">
          <div className="sticky top-0 z-10 flex h-16 fixed flex-shrink-0 border-b border-gray-200 bg-white">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 justify-between px-4">
              <div className="flex flex-1"></div>
              <div className="ml-4 flex items-center lg:ml-6">
                <div className="lg:ml-4 lg:flex lg:items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div className="flex">
                      <div>
                        <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <div className="ml-3 mr-3">
                        <div className="text-base font-medium text-gray-800">
                          {user}
                        </div>
                      </div>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Leave chat
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>
          <main className="flex-1">
            <div>
              <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3">
                <div className="xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8 ">
                  <section
                    aria-labelledby="activity-title"
                    className="mt-8 xl:mt-10"
                  >
                    <div>
                      <div className="divide-y divide-gray-200">
                        <div className="pt-6">
                          {/* Messages feed*/}

                          <div className="flow-root">
                            <ul role="list" className="pb-16">
                              {messages.map((message, itemIdx) =>
                                // todo
                                message.userName === user ? (
                                  <li key={itemIdx} className="py-2">
                                    <div className="relative pb-2">
                                      {itemIdx !== messages.length - 1 ? (
                                        <span
                                          className="absolute top-5 right-0 lg:right-5 -ml-px h-full w-0.5 bg-gray-200"
                                          aria-hidden="true"
                                        />
                                      ) : null}
                                      <div className="relative flex flex-row-reverse items-start space-x-3">
                                        <div className="relative shrink-0">
                                          <img
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                            alt=""
                                          />

                                          <span className="absolute -bottom-0.5 -left-1 rounded-tl bg-white px-0.5 py-px">
                                            <ChatBubbleLeftEllipsisIcon
                                              className="h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </div>
                                        <div className="flex flex-col">
                                          <div className="text-sm">
                                            <div>
                                              <div
                                                href="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                className="font-medium text-gray-900"
                                              ></div>
                                              <div className="text-right mr-2">
                                                {" "}
                                                {message.userName}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="text-md mt-2 p-4 max-w-full mr-2 lg:mr-0 lg:max-w-md rounded-lg text-gray-700 bg-blue-200">
                                            <div className="pb-1 break-all">
                                              {message.message}
                                            </div>
                                            <div className="flex flex-row-reverse">
                                              <div className="text-xs text-gray-500 ">
                                                {moment(message.date)
                                                  .startOf()
                                                  .fromNow()}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ) : (
                                  <li key={itemIdx}>
                                    <div className="relative pb-2">
                                      {itemIdx !== messages.length - 1 ? (
                                        <span
                                          className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                                          aria-hidden="true"
                                        />
                                      ) : null}
                                      <div className="relative flex items-start space-x-3">
                                        <div className="relative shrink-0">
                                          <img
                                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                            alt=""
                                          />

                                          <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                                            <ChatBubbleLeftEllipsisIcon
                                              className="h-5 w-5 text-gray-400"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        </div>
                                        <div className="flex flex-col">
                                          <div className="text-sm">
                                            <div>
                                              <div
                                                href="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                className="font-medium text-gray-900"
                                              ></div>
                                              <div> {message.userName}</div>
                                            </div>
                                          </div>
                                          <div className="text-md mt-2 p-4 max-w-full mr-2 lg:mr-0 lg:max-w-md rounded-lg text-gray-700 bg-gray-200">
                                            <div className="pb-1 break-all">
                                              {message.message}
                                            </div>
                                            <div className="flex flex-row-reverse">
                                              <div className="text-xs p-1 text-gray-500 ">
                                                {moment(message.date)
                                                  .startOf()
                                                  .fromNow()}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                )
                              )}
                            </ul>
                            <div ref={bottomRef}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>

                <aside className="hidden xl:block xl:pl-8">
                  <h2 className="sr-only">Group participants</h2>
                  <div className=" space-y-8 border-t border-gray-200 py-6">
                    <div className="fixed">
                      <h2 className="text-sm font-medium text-gray-900">
                        Group participants ({participants.length})
                      </h2>
                      <ul role="list" className="mt-3 space-y-3">
                        {participants.map((participant) => (
                          <li className="flex justify-start">
                            <a href="/" className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <img
                                  className="h-5 w-5 rounded-full"
                                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                  alt=""
                                />
                              </div>
                              <div className="text-sm font-medium text-black">
                                {participant}
                              </div>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
              <div className="w-full mt-3 ml-3 fixed bg-white p-1 z-0 bottom-0 justify-center rounded md:w-full md:text-xl lg:w-1/2 lg:ml-6">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt=""
                      />

                      <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                        <ChatBubbleLeftEllipsisIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex mr-1 lg:mr-0">
                      <label htmlFor="message" className="sr-only">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                        rows={2}
                        className="block w-10/12 rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-500 sm:text-sm"
                        placeholder="Message"
                        defaultValue={""}
                      />
                      <div className="flex p-1 items-center justify-end space-x-4">
                        <button
                          onClick={onSubmit}
                          className="inline-flex items-center justify-center rounded-sm ml-2 border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
