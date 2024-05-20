import React, { useState, useRef, useEffect } from 'react';
import { Link, router } from '@inertiajs/react'
import { usePage } from '@inertiajs/react'

function UserMenu({props}) {
  const { auth } = usePage().props
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  //log out
  const logout = (e) => {
    e.preventDefault();
    router.post('/logout');
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex items-center justify-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(true)}
        aria-expanded={dropdownOpen}
      >
        <img src={'/images/company/lehub-logo.jpg'} className="w-8 h-8 rounded-full"

          width="32" height="32" alt=""
        />
        <div className="flex items-center truncate">
          <span className="ml-2 text-sm font-medium truncate group-hover:text-gray-800">{props.user.name}</span>
          <svg className="flex-shrink-0 w-3 h-3 ml-1 text-gray-400 fill-current" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      {/* open dropdown if (dropdown = true) */}
      {
        dropdownOpen &&
        <section className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1">
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}
          >
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
              <div className="font-medium text-gray-800">{props.user.name}</div>
              <div className="text-xs italic text-gray-500">{props.user.email}</div>
            </div>
            {/* <ul>
              <li>
                <Link
                  className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                  href="/profile"
                >
                  Profile
                </Link>
              </li>
              <li>
                <form onSubmit=''>
                  <button
                    className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                    type="submit"
                  >
                    Sign Out
                  </button>
                </form>
              </li>
            </ul> */}
          </div>
        </section>
      }
    </div>
  )
}

export default UserMenu
