"use client";

import { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";

import MenuItem from "./MenuItem";
import Avatar from "../Avatar";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-4
            px-4 
            rounded-lg
            hover:bg-foreground-light 
            transition 
            cursor-pointer
            border
            border-foreground-light 
            shadow-sm
            bg-lime-600
            hover:bg-lime-500
          "
        >
          Rent your stuff
        </div>
        <div
          onClick={toggleOpen}
          className="
          p-2
          md:py-2
          md:px-3
          border
          border-foreground-light 
          flex 
          flex-row 
          items-center
          hover:bg-foreground-light 
          gap-2 
          rounded-full 
          cursor-pointer
          shadow-sm
          transition
          "
        >
          {/* <AiOutlineMenu size={20} className="text-foreground" /> */}
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-lg
            w-[40vw]
            md:w-56 
            bg-background 
            overflow-hidden 
            right-0 
            top-16 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer items-center">
            {currentUser ? (
              <>
                <MenuItem
                  label="My bookings"
                  onClick={() => router.push("/bookings")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="My Rentals"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push("/properties")}
                />
                <MenuItem label="Rent your stuff" onClick={rentModal.onOpen} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
