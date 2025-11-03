"use client"

import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"

export default function AuthPage() {
  // Local form states (demo only)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    phone: "",
    address: "",
  })

  return (
    <main className="relative min-h-screen">
      <Image
        src="/featured-books-collection.jpg"
        alt="کتابخانه"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-background/75 backdrop-blur-sm" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <Card className="shadow-xl border-border/60">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">ورود / ثبت‌نام</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="login">ورود</TabsTrigger>
                  <TabsTrigger value="register">ثبت‌نام</TabsTrigger>
                </TabsList>

                {/* Login */}
                <TabsContent value="login" className="mt-6">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <div className="space-y-2">
                      <label className="text-sm" htmlFor="login-username">
                        نام کاربری
                      </label>
                      <Input
                        id="login-username"
                        placeholder="example"
                        value={loginData.username}
                        onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm" htmlFor="login-password">
                        رمز عبور
                      </label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">ورود</Button>
                    <p className="text-xs text-muted-foreground text-center">
                      حساب ندارید؟ <Link href="#" className="text-primary">ثبت‌نام کنید</Link>
                    </p>
                  </form>
                </TabsContent>

                {/* Register */}
                <TabsContent value="register" className="mt-6">
                  <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onSubmit={(e) => {
                      e.preventDefault()
                    }}
                  >
                    <div className="space-y-2">
                      <label className="text-sm" htmlFor="firstName">نام</label>
                      <Input
                        id="firstName"
                        placeholder="علی"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm" htmlFor="lastName">نام خانوادگی</label>
                      <Input
                        id="lastName"
                        placeholder="محمدی"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm" htmlFor="reg-username">نام کاربری</label>
                      <Input
                        id="reg-username"
                        placeholder="example"
                        value={registerData.username}
                        onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm" htmlFor="reg-password">رمز عبور</label>
                      <Input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm" htmlFor="phone">شماره موبایل</label>
                      <Input
                        id="phone"
                        inputMode="tel"
                        placeholder="09xxxxxxxxx"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm" htmlFor="address">آدرس</label>
                      <Input
                        id="address"
                        placeholder="آدرس کامل"
                        value={registerData.address}
                        onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                        required
                      />
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


