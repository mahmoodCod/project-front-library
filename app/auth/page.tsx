"use client"

import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { addUser, getUserByUsername } from "@/lib/users-store"

export default function AuthPage() {
  // Local form states (demo only)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [loginErrors, setLoginErrors] = useState<{ username?: string; password?: string }>({})
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
  })
  const [registerErrors, setRegisterErrors] = useState<{
    firstName?: string
    lastName?: string
    username?: string
    password?: string
    phone?: string
  }>({})

  const { login } = useAuth()
  const router = useRouter()

  function validateLogin(): boolean {
    const errs: typeof loginErrors = {}
    if (!loginData.username.trim()) errs.username = "نام کاربری الزامی است"
    if (!loginData.password.trim()) errs.password = "رمز عبور الزامی است"
    setLoginErrors(errs)
    return Object.keys(errs).length === 0
  }

  function validateRegister(): boolean {
    const errs: typeof registerErrors = {}
    if (!registerData.firstName.trim()) errs.firstName = "نام را وارد کنید"
    if (!registerData.lastName.trim()) errs.lastName = "نام خانوادگی را وارد کنید"
    if (!registerData.username.trim()) errs.username = "نام کاربری الزامی است"
    if (!registerData.password || registerData.password.length < 8)
      errs.password = "رمز عبور باید حداقل ۸ کاراکتر باشد"
    const phoneOk = /^0?9\d{9}$/.test(registerData.phone)
    if (!phoneOk) errs.phone = "شماره موبایل را به شکل صحیح وارد کنید (مثال: 09xxxxxxxxx)"
    setRegisterErrors(errs)
    return Object.keys(errs).length === 0
  }

  return (
    <main className="relative min-h-screen">
      {/* Background image + gradient overlays */}
      <Image
        src="/featured-books-collection.jpg"
        alt="کتابخانه"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60rem_60rem_at_80%_10%,rgba(0,0,0,.2),transparent_40%),radial-gradient(50rem_50rem_at_20%_90%,rgba(0,0,0,.2),transparent_40%)]" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4" dir="rtl">
        <Link href="/" className="absolute top-3 right-3 md:top-6 md:right-6 text-xs md:text-sm text-white/85 hover:text-white bg-white/10 hover:bg.white/20 px-3 py-1 rounded-full z-50">
          ← بازگشت به صفحه اصلی
        </Link>
        <div className="w-full max-w-md md:max-w-lg">
          <Card className="shadow-2xl border-border/60 backdrop-blur supports-[backdrop-filter]:bg-black/40 text-white text-right">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-3xl text-white">به مکتب شریف خوش آمدید</CardTitle>
              <p className="text-sm text-white/85">حساب کاربری خود را بسازید یا وارد شوید</p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full text-white">
                <TabsList className="grid grid-cols-2 w-full bg-white/10">
                  <TabsTrigger value="login">ورود</TabsTrigger>
                  <TabsTrigger value="register">ثبت‌نام</TabsTrigger>
                </TabsList>

                {/* Login */}
                <TabsContent value="login" className="mt-6">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      const errs: typeof loginErrors = {}
                      if (!loginData.username.trim()) errs.username = "نام کاربری الزامی است"
                      if (!loginData.password.trim()) errs.password = "رمز عبور الزامی است"
                      setLoginErrors(errs)
                      if (Object.keys(errs).length) return

                      // چک کردن admin
                      if (loginData.username.trim() === "admin") {
                        const ok = login(loginData.username.trim(), loginData.password)
                        if (ok) {
                          router.push("/admin")
                          return
                        } else {
                          setLoginErrors({ password: "رمز عبور اشتباه است" })
                          return
                        }
                      }
                      
                      // چک کردن اینکه کاربر عادی ثبت نام کرده باشد
                      const user = getUserByUsername(loginData.username.trim())
                      if (!user) {
                        setLoginErrors({ username: "کاربری با این نام کاربری پیدا نشد. لطفاً ابتدا ثبت نام کنید." })
                        return
                      }

                      // try login برای کاربر عادی
                      const ok = login(loginData.username.trim(), loginData.password)
                      if (ok) {
                        router.push("/")
                        return
                      }
                      
                      // اگر ورود موفق نبود
                      setLoginErrors({ password: "رمز عبور اشتباه است" })
                    }}
                    noValidate
                  >
                    <div className="relative space-y-1 pb-1">
                      <label className="text-sm text-white" htmlFor="login-username">
                        نام کاربری
                      </label>
                      <Input
                        id="login-username"
                        placeholder="example"
                        value={loginData.username}
                        onChange={(e) => {
                          const v = e.target.value
                          setLoginData({ ...loginData, username: v })
                          setLoginErrors((p) => ({ ...p, username: v.trim() ? undefined : "نام کاربری الزامی است" }))
                        }}
                        onBlur={(e) => {
                          const v = e.target.value
                          setLoginErrors((p) => ({ ...p, username: v.trim() ? undefined : "نام کاربری الزامی است" }))
                        }}
                        className="text-right"
                      />
                      {loginErrors?.username ? (
                        <p className="absolute top-full right-0 mt-0 text-[10px] leading-none text-red-400">{loginErrors.username}</p>
                      ) : null}
                    </div>
                    <div className="relative space-y-1 pb-1">
                      <label className="text-sm text-white" htmlFor="login-password">
                        رمز عبور
                      </label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => {
                          const v = e.target.value
                          setLoginData({ ...loginData, password: v })
                          setLoginErrors((p) => ({ ...p, password: v.trim() ? undefined : "رمز عبور الزامی است" }))
                        }}
                        onBlur={(e) => {
                          const v = e.target.value
                          setLoginErrors((p) => ({ ...p, password: v.trim() ? undefined : "رمز عبور الزامی است" }))
                        }}
                        className="text-right"
                      />
                      {loginErrors?.password ? (
                        <p className="absolute top-full right-0 mt-0 text-[10px] leading-none text-red-400">{loginErrors.password}</p>
                      ) : null}
                    </div>
                    <Button type="submit" className="w-full">ورود</Button>
                    <p className="text-xs text-white/80 text-center">
                      حساب ندارید؟
                      <button type="button" className="text-primary ms-1" onClick={() => {
                        const tab = document.querySelector('[data-state]')
                      }}>
                        ثبت‌نام کنید
                      </button>
                    </p>
                  </form>
                </TabsContent>

                {/* Register */}
                <TabsContent value="register" className="mt-6">
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                      const errs: typeof registerErrors = {}
                      if (!registerData.firstName.trim()) errs.firstName = "نام را وارد کنید"
                      if (!registerData.lastName.trim()) errs.lastName = "نام خانوادگی را وارد کنید"
                      if (!registerData.username.trim()) errs.username = "نام کاربری الزامی است"
                      if (!registerData.password || registerData.password.length < 8) errs.password = "رمز عبور باید حداقل ۸ کاراکتر باشد"
                      if (!/^0?9\d{9}$/.test(registerData.phone)) errs.phone = "شماره موبایل را به شکل صحیح وارد کنید (مثال: 09xxxxxxxxx)"
                      
                      // چک کردن اینکه نام کاربری تکراری نباشد
                      if (registerData.username.trim() && getUserByUsername(registerData.username.trim())) {
                        errs.username = "این نام کاربری قبلاً استفاده شده است"
                      }
                      
                      setRegisterErrors(errs)
                      if (Object.keys(errs).length) return

                      // ثبت نام کاربر
                      try {
                        const newUser = addUser({
                          firstName: registerData.firstName.trim(),
                          lastName: registerData.lastName.trim(),
                          username: registerData.username.trim(),
                          password: registerData.password,
                          phone: registerData.phone,
                        })
                        
                        // بعد از ثبت نام، کاربر را وارد کن
                        login(newUser.username, newUser.password)
                        router.push("/")
                        alert("ثبت نام با موفقیت انجام شد و شما وارد شدید")
                      } catch (error) {
                        const errorMessage = error instanceof Error ? error.message : "خطا در ثبت نام"
                        setRegisterErrors({ username: errorMessage })
                      }
                    }}
                    noValidate
                  >
                    <div className="relative space-y-1 pb-1">
                      <label className="text-sm text-white" htmlFor="lastName">نام خانوادگی</label>
                      <Input
                        id="lastName"
                        placeholder="محمدی"
                        value={registerData.lastName}
                        onChange={(e) => {
                          const v = e.target.value
                          setRegisterData({ ...registerData, lastName: v })
                          setRegisterErrors((p) => ({ ...p, lastName: v.trim() ? undefined : "نام خانوادگی را وارد کنید" }))
                        }}
                        className="text-right"
                        required
                        onBlur={() => {
                          setRegisterErrors((p) => ({ ...p, lastName: registerData.lastName.trim() ? undefined : "نام خانوادگی را وارد کنید" }))
                        }}
                      />
                      {registerErrors.lastName ? (
                        <p className="absolute top-full right-0 mt-0 text-[10px] leading-none text-red-400">{registerErrors.lastName}</p>
                      ) : null}
                    </div>
                    <div className="relative space-y-1 pb-1">
                      <label className="text-sm text-white" htmlFor="firstName">نام</label>
                      <Input
                        id="firstName"
                        placeholder="علی"
                        value={registerData.firstName}
                        onChange={(e) => {
                          const v = e.target.value
                          setRegisterData({ ...registerData, firstName: v })
                          setRegisterErrors((p) => ({ ...p, firstName: v.trim() ? undefined : "نام را وارد کنید" }))
                        }}
                        className="text-right"
                        required
                        onBlur={() => {
                          setRegisterErrors((p) => ({ ...p, firstName: registerData.firstName.trim() ? undefined : "نام را وارد کنید" }))
                        }}
                      />
                      {registerErrors.firstName ? (
                        <p className="absolute top-full right-0 mt-0 text-[10px] leading-none text-red-400">{registerErrors.firstName}</p>
                      ) : null}
                    </div>
                    <div className="relative space-y-1 pb-1 md:col-span-2">
                      <label className="text-sm text-white" htmlFor="reg-username">نام کاربری</label>
                      <Input
                        id="reg-username"
                        placeholder="example"
                        value={registerData.username}
                        onChange={(e) => {
                          const v = e.target.value
                          setRegisterData({ ...registerData, username: v })
                          setRegisterErrors((p) => ({ ...p, username: v.trim() ? undefined : "نام کاربری الزامی است" }))
                        }}
                        className="text-right"
                        required
                        onBlur={() => {
                          setRegisterErrors((p) => ({ ...p, username: registerData.username.trim() ? undefined : "نام کاربری الزامی است" }))
                        }}
                      />
                      {registerErrors.username ? (
                        <p className="absolute top-full right-0 mt-0 text-[10px] leading-none text-red-400">{registerErrors.username}</p>
                      ) : null}
                    </div>
                    <div className="relative space-y-1 pb-1 md:col-span-2">
                      <label className="text-sm text-white" htmlFor="reg-password">رمز عبور</label>
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="حداقل ۸ کاراکتر"
                        value={registerData.password}
                        onChange={(e) => {
                          const v = e.target.value
                          setRegisterData({ ...registerData, password: v })
                          setRegisterErrors((p) => ({ ...p, password: v && v.length >= 8 ? undefined : "رمز عبور باید حداقل ۸ کاراکتر باشد" }))
                        }}
                        minLength={8}
                        className="text-right"
                        required
                        onBlur={() => {
                          setRegisterErrors((p) => ({ ...p, password: registerData.password && registerData.password.length >= 8 ? undefined : "رمز عبور باید حداقل ۸ کاراکتر باشد" }))
                        }}
                      />
                      <p className="text-xs text-white/70">از حروف بزرگ/کوچک و عدد استفاده کنید.</p>
                      {registerErrors.password ? (
                        <p className="absolute top-full right-0 mt-0 text-[10px] leading-none text-red-400">{registerErrors.password}</p>
                      ) : null}
                    </div>
                    <div className="relative space-y-1 pb-1 md:col-span-2">
                      <label className="text-sm text-white" htmlFor="phone">شماره موبایل</label>
                      <Input
                        id="phone"
                        inputMode="tel"
                        placeholder="09xxxxxxxxx"
                        value={registerData.phone}
                        onChange={(e) => {
                          const v = e.target.value
                          setRegisterData({ ...registerData, phone: v })
                          setRegisterErrors((p) => ({ ...p, phone: /^0?9\d{9}$/.test(v) ? undefined : "شماره موبایل را به شکل صحیح وارد کنید (مثال: 09xxxxxxxxx)" }))
                        }}
                        pattern="^0?9\\d{9}$"
                        className="text-right"
                        required
                        onBlur={() => {
                          setRegisterErrors((p) => ({ ...p, phone: /^0?9\d{9}$/.test(registerData.phone) ? undefined : "شماره موبایل را به شکل صحیح وارد کنید (مثال: 09xxxxxxxxx)" }))
                        }}
                      />
                      {registerErrors.phone ? (
                        <p className="absolute top-full right-0 mt-0 text-[10px] leading-none text-red-400">{registerErrors.phone}</p>
                      ) : null}
                    </div>
                    
                    <div className="md:col-span-2">
                      <Button type="submit" className="w-full">ثبت‌نام</Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}


