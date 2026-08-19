import { X } from "lucide-react";

import BillStatusBadge from "./BillStatusBadge";
import { markPaid } from "../services/billService";
import { getCaptainName } from "../services/printerService";

type Props = {
  open:boolean;
  bill:any;
  onClose:()=>void;
};

export default function BillDrawer({
  open,
  bill,
  onClose,
}:Props){

  if(!open || !bill) return null;

  return(

<div className="fixed inset-0 bg-black/40 flex justify-end z-50">

<div className="w-full max-w-lg bg-white h-full overflow-y-auto">

<div className="border-b p-6 flex justify-between">

<div>

<h2 className="text-2xl font-bold">
{bill.orderNumber}
</h2>

<p className="text-gray-500">
Bill Details
</p>

</div>

<button onClick={onClose}>
<X/>
</button>

</div>

<div className="p-6 space-y-6">

<div className="border rounded-2xl p-5">

<BillStatusBadge paymentStatus={bill.paymentStatus}/>

</div>

<div className="border rounded-2xl p-5">

<h3 className="font-semibold mb-4">
Items
</h3>

<div className="space-y-3">

{bill.items?.map((item:any,index:number)=>(

<div
key={index}
className="flex justify-between"
>

<div>

<div className="font-medium">
{item.name}
</div>

<div className="text-sm text-gray-500">
Qty {item.quantity}
</div>

</div>

<div>
₹{item.price*item.quantity}
</div>

</div>

))}

</div>

</div>

<div className="border rounded-2xl p-5 space-y-4">

<div className="flex justify-between">

<span>Total</span>

<strong>
₹{bill.total}
</strong>

</div>

<div className="flex justify-between">

<span>Waiter</span>

<span>
{bill.waiterName}
</span>

</div>

<div className="flex justify-between">

<span>Captain</span>

<span>
{getCaptainName() || "--"}
</span>

</div>

</div>

<button

onClick={async()=>{

await markPaid(
bill.id,
"Cash"
);

onClose();

}}

className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 font-semibold"

>

Mark Paid

</button>

</div>

</div>

</div>

);

}