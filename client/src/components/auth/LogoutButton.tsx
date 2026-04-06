"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { LogOut } from "lucide-react"
import Cookies from "js-cookie"
import { logout } from "@/lib/api/auth.api"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

export default function LogoutButton() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      Cookies.remove("accessToken")
      Cookies.remove("refreshToken")
      router.push("/auth")
    },
  })

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="font-body antialiased"
        onClick={() => setOpen(true)}
        aria-label="Logout"
      >
        <LogOut className="size-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="max-w-sm font-body antialiased">
          <DialogHeader>
            <DialogTitle>Log out?</DialogTitle>
            <DialogDescription>
              You will be signed out of your account.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => mutate()}
              disabled={isPending}
            >
              {isPending ? "Logging out…" : "Log out"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
