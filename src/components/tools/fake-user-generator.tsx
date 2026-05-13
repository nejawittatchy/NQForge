"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Copy, Download, User } from "lucide-react";
import { toast } from "sonner";

const FIRST_NAMES = ["Alice","Bob","Carol","David","Emma","Frank","Grace","Henry","Iris","Jack","Kate","Liam","Mia","Noah","Olivia","Paul","Quinn","Rachel","Sam","Tara","Uma","Victor","Wendy","Xavier","Yara","Zoe","Aiden","Bella","Cole","Diana","Ethan","Fiona","George","Hannah","Ivan","Julia","Kevin","Laura","Mike","Nora","Oscar","Petra","Roy","Sara","Tom","Uma","Vera","Will","Xena","Yuki","Zara"];
const LAST_NAMES = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Young","Martinez","Robinson","Clark","Lewis","Lee","Walker","Hall","Allen","Hill","Scott","Green","Adams","Baker","Nelson","Carter","Mitchell","Perez","Roberts","Turner","Phillips","Campbell","Evans","Edwards","Collins","Stewart","Sanchez","Morris","Rogers","Reed","Cook","Morgan"];
const DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","protonmail.com","icloud.com","example.com","test.io"];
const STREETS = ["Main St","Oak Ave","Park Blvd","Maple Dr","Cedar Ln","Pine Rd","Elm St","Walnut Ave","Lake View Dr","River Rd","Forest Path","Highland Ave"];
const CITIES = ["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville","Denver","Seattle","Nashville","Boston","Portland","Las Vegas","Louisville","Baltimore"];
const STATES = ["NY","CA","IL","TX","AZ","PA","FL","GA","WA","CO","TN","MA","OR","NV","KY","MD","NC","MN","WI","MO"];
const JOBS = ["Software Engineer","Product Manager","Data Scientist","UX Designer","Marketing Specialist","Sales Representative","DevOps Engineer","Backend Developer","Frontend Developer","Full-Stack Developer","Data Analyst","Project Manager","Systems Architect","Security Engineer","ML Engineer"];
const COMPANIES = ["TechCorp","Innovate Inc","DataFlow","CloudSystems","NextGen Solutions","ByteWave","Digital Minds","Apex Technologies","CoreLogic","FutureTech","Streamline Co","NovaSoft","QuantumLabs","HorizonTech","PulseTech"];
const AVATARS = ["https://api.dicebear.com/7.x/avataaars/svg?seed=", "https://api.dicebear.com/7.x/micah/svg?seed=", "https://api.dicebear.com/7.x/personas/svg?seed="];

function rand<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min: number, max: number) { return min + Math.floor(Math.random() * (max - min + 1)); }

interface FakeUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  job: string;
  company: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  website: string;
  avatar: string;
  createdAt: string;
}

function generateUser(): FakeUser {
  const first = rand(FIRST_NAMES);
  const last = rand(LAST_NAMES);
  const age = randInt(18, 70);
  const id = Math.random().toString(36).slice(2, 10).toUpperCase();
  return {
    id,
    firstName: first,
    lastName: last,
    username: `${first.toLowerCase()}_${last.toLowerCase()}${randInt(10, 99)}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@${rand(DOMAINS)}`,
    phone: `+1 (${randInt(200,999)}) ${randInt(100,999)}-${randInt(1000,9999)}`,
    age,
    gender: Math.random() > 0.5 ? "Male" : "Female",
    job: rand(JOBS),
    company: rand(COMPANIES),
    street: `${randInt(100,9999)} ${rand(STREETS)}`,
    city: rand(CITIES),
    state: rand(STATES),
    zip: String(randInt(10000, 99999)),
    website: `https://${first.toLowerCase()}${last.toLowerCase()}.dev`,
    avatar: `${rand(AVATARS)}${id}`,
    createdAt: new Date(Date.now() - randInt(0, 365 * 24 * 60 * 60 * 1000) * 1000).toISOString().split("T")[0],
  };
}

export function FakeUserGenerator() {
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState("json");
  const [users, setUsers] = useState<FakeUser[]>([]);

  const generate = () => setUsers(Array.from({length: count}, generateUser));

  const getOutput = () => {
    if (format === "json") return JSON.stringify(count === 1 ? users[0] : users, null, 2);
    if (format === "csv") {
      const headers = ["id","firstName","lastName","username","email","phone","age","gender","job","company","city","state","zip"];
      return [headers.join(","), ...users.map(u => headers.map(h => `"${(u as any)[h]}"`).join(","))].join("\n");
    }
    return users.map(u => `INSERT INTO users (id,first_name,last_name,email,phone,age,job,city) VALUES ('${u.id}','${u.firstName}','${u.lastName}','${u.email}','${u.phone}',${u.age},'${u.job}','${u.city}');`).join("\n");
  };

  const copy = () => { navigator.clipboard.writeText(getOutput()); toast.success("Copied!"); };
  const download = () => {
    const ext = format === "json" ? "json" : format === "csv" ? "csv" : "sql";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([getOutput()], {type: "text/plain"}));
    a.download = `fake-users.${ext}`; a.click();
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Count</Label>
          <Input type="number" min={1} max={50} value={count} onChange={e => setCount(Math.max(1, Math.min(50, parseInt(e.target.value)||1)))} className="rounded-xl h-11"/>
        </div>
        <div className="space-y-2">
          <Label>Export Format</Label>
          <Select value={format} onValueChange={(v) => setFormat(v || "json")}>
            <SelectTrigger className="rounded-xl h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="sql">SQL INSERT</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={generate} className="w-full brand-gradient text-white border-0 h-12 rounded-xl font-bold">
        <RefreshCw className="mr-2 w-4 h-4"/>Generate Fake Users
      </Button>

      {users.length > 0 && (
        <div className="space-y-4">
          {count === 1 && users[0] && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/40 border border-border">
              <div className="w-14 h-14 rounded-full bg-brand/10 flex items-center justify-center text-brand flex-shrink-0">
                <User size={28}/>
              </div>
              <div>
                <p className="font-bold">{users[0].firstName} {users[0].lastName}</p>
                <p className="text-sm text-muted-foreground">{users[0].email}</p>
                <p className="text-xs text-muted-foreground">{users[0].job} at {users[0].company} · {users[0].city}, {users[0].state}</p>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Output ({format.toUpperCase()})</Label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={download} className="h-8 text-xs"><Download className="mr-1 w-3.5 h-3.5"/>Download</Button>
                <Button variant="outline" size="sm" onClick={copy} className="h-8 text-xs rounded-lg"><Copy className="mr-1 w-3.5 h-3.5"/>Copy</Button>
              </div>
            </div>
            <pre className="w-full bg-muted/30 border border-border rounded-2xl p-5 font-mono text-xs overflow-x-auto max-h-80 overflow-y-auto leading-relaxed">{getOutput()}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
