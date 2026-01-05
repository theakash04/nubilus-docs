import { Button } from '@/components/ui/Button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Building, Clock, Database, Github, Server, Shield, Smartphone, Terminal } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative pt-24 pb-32 overflow-hidden bg-background isolate transition-colors duration-500">
        
        {/* Dark Grid Background */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        
        {/* Deep Purple Glows */}
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-[120px] opacity-40 dark:opacity-30 pointer-events-none">
          <div className="h-[400px] w-[600px] rounded-full bg-linear-to-tr from-primary-800 via-primary-600 to-purple-900"></div>
        </div>
        
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center relative z-10">
          
          <div className="inline-flex items-center space-x-2 bg-card/50 border border-border rounded-full px-3 py-1 mb-8 shadow-sm backdrop-blur-md animate-fade-in ring-1 ring-border">
            <span className="text-xs font-bold text-primary-600 dark:text-primary-300 uppercase tracking-wide">Open Source Infrastructure Monitoring</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 max-w-5xl mx-auto leading-[1.1]">
            Own your monitoring <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-500 to-purple-400 font-black drop-shadow-sm">stack.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed px-4">
             A privacy-focused, lightweight, and self-hosted monitoring platform. Track server performance, endpoint uptime, and database health with zero third-party dependencies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 justify-center">
            <Link to="/docs" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-14 text-base px-8 rounded-full shadow-lg shadow-primary-900/20 bg-primary-600 hover:bg-primary-500 border border-primary-500/50 hover:shadow-primary-500/30 transition-all transform hover:-translate-y-0.5">
                Read Documentation <ArrowRight className="ml-2 h-5 w-5"/>
              </Button>
            </Link>
            <a href={import.meta.env.VITE_GIT_URL} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
               <Button variant="secondary" size="lg" className="w-full h-14 text-base rounded-full bg-card/50 backdrop-blur border-border hover:bg-card text-foreground transition-colors">
                 <Github className="mr-2 h-5 w-5" />
                 View on GitHub
               </Button>
            </a>
          </div>

          {/* Static Visual Preview */}
          <div className="mt-16 sm:mt-20 relative w-full max-w-5xl mx-auto perspective-1000 px-4 group">
            <div className="relative transform sm:rotate-x-6 transition-transform duration-700 hover:rotate-x-0 group-hover:scale-[1.01]">
               <div className="absolute -inset-1 bg-linear-to-r from-primary-600 to-purple-600 rounded-xl blur-2xl opacity-10 group-hover:opacity-20 transition duration-500"></div>
               <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border bg-background">
                  <div className="h-8 sm:h-9 bg-muted border-b border-border flex items-center px-3 sm:px-4 space-x-2">
                     <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-muted-foreground/30"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-muted-foreground/30"></div>
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-muted-foreground/30"></div>
                     </div>
                     <div className="flex-1 text-center text-[10px] sm:text-xs font-mono text-muted-foreground">localhost:3000</div>
                  </div>
                  <div className="p-1 bg-background aspect-4/3 sm:aspect-video md:aspect-16/8 overflow-hidden relative">
                    <div className="absolute inset-0 bg-background p-3 sm:p-6 flex flex-col gap-3 sm:gap-6 select-none pointer-events-none">
                       {/* Header skeleton */}
                       <div className="flex justify-between items-center mb-1 sm:mb-2">
                          <div>
                            <div className="h-4 sm:h-6 w-20 sm:w-32 bg-muted rounded mb-1 sm:mb-2"></div>
                            <div className="h-2 sm:h-3 w-28 sm:w-48 bg-muted/50 rounded"></div>
                          </div>
                          <div className="flex space-x-2 sm:space-x-3">
                            <div className="h-6 w-6 sm:h-8 sm:w-8 bg-muted rounded-lg"></div>
                          </div>
                       </div>
                       {/* Stats cards grid - 2 cols on mobile, 4 on larger */}
                       <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                          {[1,2,3,4].map(i => (
                            <div key={i} className={`h-16 sm:h-24 bg-card border border-border rounded-lg p-2 sm:p-4 flex flex-col justify-between shadow-sm ${i > 2 ? 'hidden sm:flex' : 'flex'}`}>
                               <div className="h-5 w-5 sm:h-8 sm:w-8 rounded bg-muted flex items-center justify-center">
                                  <div className="h-2.5 w-2.5 sm:h-4 sm:w-4 bg-primary-500/20 rounded"></div>
                                </div>
                               <div className="space-y-1 sm:space-y-2 pt-2">
                                  <div className="h-2 sm:h-3 w-8 sm:w-12 bg-muted rounded"></div>
                                  <div className="h-3 sm:h-5 w-12 sm:w-20 bg-muted rounded"></div>
                               </div>
                            </div>
                          ))}
                       </div>
                       {/* Chart and list - hidden on mobile */}
                       <div className="flex-1 hidden sm:grid grid-cols-3 gap-4">
                          <div className="col-span-2 bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm relative overflow-hidden flex flex-col">
                             <div className="flex justify-between mb-3 md:mb-4">
                                <div className="h-3 md:h-4 w-20 md:w-24 bg-muted rounded"></div>
                             </div>
                             <div className="flex-1 flex items-end px-1 md:px-2 space-x-0.5 md:space-x-1 opacity-70">
                                {Array.from({length: 24}).map((_, i) => (
                                   <div key={i} className="flex-1 bg-linear-to-t from-primary-900/50 to-primary-600 rounded-t" style={{height: `${Math.random() * 60 + 20}%`, opacity: Math.random() * 0.5 + 0.5}}></div>
                                ))}
                             </div>
                          </div>
                          <div className="col-span-1 bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm space-y-3 md:space-y-4">
                             <div className="h-3 md:h-4 w-16 md:w-20 bg-muted rounded mb-2"></div>
                             {[1,2,3,4,5].map(i => (
                                <div key={i} className="flex items-center space-x-2 md:space-x-3">
                                   <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                   <div className="flex-1 h-2 bg-muted/50 rounded"></div>
                                   <div className="h-2 w-6 md:w-8 bg-muted/50 rounded"></div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="py-24 bg-card relative overflow-hidden border-t border-border">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-900/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="text-center mb-20">
              <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Everything you need to monitor</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                No complex enterprise features. Just clean, actionable data about your systems.
              </p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-auto md:auto-rows-[320px]">
              <div className="md:col-span-2 relative group overflow-hidden bg-muted rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 flex flex-col justify-between transition-all duration-500">
                  <div className="relative z-10">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm ring-1 ring-border">
                          <Building className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Multi-Tenant Architecture</h3>
                      <p className="text-muted-foreground max-w-sm text-base sm:text-lg leading-relaxed">Isolate production from staging. Group your resources and control access with simple organization logic.</p>
                  </div>
              </div>

              <div className="md:row-span-2 relative group overflow-hidden bg-muted rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 flex flex-col transition-all duration-500">
                   <div className="relative z-10">
                       <div className="w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm ring-1 ring-border">
                          <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                       </div>
                       <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Zero-Config Agent</h3>
                       <p className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">Install the monitoring agent on any Linux server with a single command. It just works.</p>
                   </div>
                   
                   <div className="mt-auto bg-card rounded-lg sm:rounded-xl p-3 sm:p-5 font-mono text-[10px] sm:text-xs text-muted-foreground border border-border shadow-xl relative transition-transform duration-500">
                      <div className="flex space-x-1.5 mb-3 sm:mb-4 border-b border-border pb-2 sm:pb-3">
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-500"></div>
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-500"></div>
                          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green-500"></div>
                      </div>
                      <div className="space-y-2 sm:space-y-3 overflow-x-hidden">
                          <p className="wrap-break-word"><span className="text-emerald-400">➜</span> curl -sSL https://github.com/theakash04/Nubilus/releases/latest/download/install.sh | sudo bash</p>
                          <p className="text-muted-foreground/70">Connecting to server...</p>
                          <p className="text-emerald-400">✓ Agent started and streaming metrics</p>
                      </div>
                   </div>
              </div>

              <div className="md:col-span-2 relative group overflow-hidden bg-muted rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 transition-all duration-500">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm ring-1 ring-border">
                      <Server className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Host Metrics</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">CPU, RAM, Disk, and Network monitoring with historical data retention you control.</p>
              </div>

              <div className="relative group overflow-hidden bg-muted rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 transition-all duration-500">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm ring-1 ring-border">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                   </div>
                   <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">100% Private</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">Because it's self-hosted, your infrastructure data never leaves your network.</p>
              </div>

              <div className="md:col-span-2 relative group overflow-hidden bg-muted rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 transition-all duration-500">
                   <div className="w-10 h-10 sm:w-12 sm:h-12 bg-card rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-sm ring-1 ring-border">
                      <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-500" />
                   </div>
                   <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">Install as App</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">Add to your home screen for quick access — no need to open the browser every time.</p>
              </div>

               <div className="md:col-span-3 relative group overflow-hidden bg-muted rounded-2xl sm:rounded-3xl border border-border p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between transition-all duration-500 h-auto md:h-[200px]">
                   <div className="md:w-1/2 mb-4 md:mb-0 relative z-10">
                       <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                          <div className="w-10 h-10 bg-card rounded-xl flex items-center justify-center shadow-sm ring-1 ring-border">
                              <Database className="w-5 h-5 text-indigo-500" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-foreground">Database Monitoring</h3>
                          <span className="px-2 py-0.5 text-[10px] sm:text-xs hidden sm:block font-semibold bg-amber-500/20 text-amber-400 rounded-full ring-1 ring-amber-500/30">Coming Soon</span>
                          <span className="sm:hidden text-amber-400">
                          <Clock size={16}/>
                          </span>
                       </div>
                       <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Monitor connection pools, transaction rates, and cache hits for Postgres, MySQL, and Redis.</p>
                   </div>
               </div>
           </div>
        </div>
      </div>

       {/* How it works */}
       <div className="py-24 bg-background border-t border-border">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h2 className="text-3xl font-bold text-foreground mb-8">Ready to explore?</h2>
           <p className="text-lg text-muted-foreground mb-10">
             Check out the full installation guide and technical overview in our documentation.
           </p>

           <div className="mt-12 flex justify-center space-x-4">
             <Link to="/docs">
               <Button size="lg" className="px-8 bg-foreground text-background hover:bg-foreground/90">
                 Read Documentation
               </Button>
             </Link>
             <a href={import.meta.env.VITE_GIT_URL} target="_blank" rel="noreferrer">
               <Button variant="secondary" size="lg" className="px-8">
                 GitHub Repo
               </Button>
             </a>
           </div>
         </div>
       </div>
  </>
  )
}
