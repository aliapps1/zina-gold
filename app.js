const GOLD_PRICE = 280;
const translations = {
  en: {
    brand:"ZINA Gold", subBrand:"Gold-backed card demo", eyebrow:"Premium Demo • UAE First",
    headline:"Your wealth, always in hand.",
    intro:"A premium concept for holding value in gold and accessing AED spending power through future regulated card partners.",
    holder:"Card Holder", status:"Status", active:"Active", goldBalance:"Gold Balance", aedValue:"AED Value",
    convert:"Convert", withdraw:"Withdraw", send:"Send", history:"History",
    warning:"Demo only. Banking, card issuing, custody, KYC, AML and ATM functions require regulated partner integration and approval.",
    goldPrice:"Gold Price / g", cardLimit:"Demo Card Limit", spentToday:"Spent Today",
    convertTitle:"Convert Gold to AED", convertText:"Simulate instant conversion from gold balance into AED spending power.",
    gramsLabel:"Gold amount in grams", purposeLabel:"Purpose", estimated:"Estimated value:",
    atmTitle:"ATM Withdrawal Simulation", atmText:"Shown as a future regulated card issuer integration scenario.",
    withdrawLabel:"Withdrawal amount", simulate:"Simulate Request", require:"would require about",
    sendTitle:"Send Gold Value", sendText:"A demo flow for sending AED-equivalent value backed by gold balance.",
    recipientLabel:"Recipient", sendAmountLabel:"Amount in AED", sendDemo:"Preview Send",
    historyTitle:"Recent Activity", historyText:"Demo transaction history for the investor preview.",
    tx1:"Gold top-up", tx2:"Card purchase", tx3:"ATM simulation",
    complianceTitle:"Regulated Launch Requirements",
    complianceText:"Final launch requires KYC, AML, licensed gold custody, card issuer API integration, and regulatory approval.",
    custody:"Gold Custody", issuer:"Issuer API", toast:"Preview only — no live transfer has been made."
  },
  ar: {
    brand:"زينة جولد", subBrand:"نموذج بطاقة مدعومة بالذهب", eyebrow:"نموذج فاخر • البداية من الإمارات",
    headline:"ثروتك دائماً في متناولك.",
    intro:"تصور فاخر لحفظ القيمة بالذهب والوصول إلى قوة إنفاق بالدرهم عبر شركاء بطاقات مرخصين مستقبلاً.",
    holder:"حامل البطاقة", status:"الحالة", active:"فعالة", goldBalance:"رصيد الذهب", aedValue:"القيمة بالدرهم",
    convert:"تحويل", withdraw:"سحب", send:"إرسال", history:"السجل",
    warning:"هذه نسخة تجريبية فقط. الخدمات المصرفية وإصدار البطاقات وحفظ الذهب وKYC وAML والسحب من الصراف تتطلب تكاملاً مع شركاء مرخصين وموافقات تنظيمية.",
    goldPrice:"سعر الذهب / جرام", cardLimit:"حد البطاقة التجريبي", spentToday:"مصروف اليوم",
    convertTitle:"تحويل الذهب إلى درهم", convertText:"محاكاة تحويل فوري من رصيد الذهب إلى قوة إنفاق بالدرهم.",
    gramsLabel:"كمية الذهب بالجرام", purposeLabel:"الغرض", estimated:"القيمة التقديرية:",
    atmTitle:"محاكاة السحب من الصراف", atmText:"يعرض كسيناريو تكامل مستقبلي مع جهة إصدار بطاقة مرخصة.",
    withdrawLabel:"مبلغ السحب", simulate:"محاكاة الطلب", require:"يتطلب تقريباً",
    sendTitle:"إرسال قيمة الذهب", sendText:"مسار تجريبي لإرسال قيمة بالدرهم مدعومة برصيد الذهب.",
    recipientLabel:"المستلم", sendAmountLabel:"المبلغ بالدرهم", sendDemo:"معاينة الإرسال",
    historyTitle:"آخر النشاطات", historyText:"سجل عمليات تجريبي لعرض المستثمر.",
    tx1:"إضافة ذهب", tx2:"شراء بالبطاقة", tx3:"محاكاة صراف",
    complianceTitle:"متطلبات الإطلاق المنظم",
    complianceText:"الإطلاق النهائي يتطلب KYC وAML وحفظ ذهب مرخص وتكامل API مع جهة إصدار بطاقات وموافقة تنظيمية.",
    custody:"حفظ الذهب", issuer:"واجهة المصدر", toast:"معاينة فقط — لم يتم إجراء تحويل حقيقي."
  }
};
function currentLang(){return document.documentElement.lang==="ar"?"ar":"en";}
function setLang(lang){
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.body.classList.toggle("rtl",lang==="ar");
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.dataset.i18n;if(translations[lang][k])el.textContent=translations[lang][k];});
  convertGold(); withdrawSim();
}
function formatAED(value){return `AED ${Math.round(value).toLocaleString()}`;}
function convertGold(){
  const grams=Number(document.getElementById("grams")?.value||0);
  const value=grams*GOLD_PRICE;
  const result=document.getElementById("convertResult");
  if(result) result.textContent=`${translations[currentLang()].estimated} ${formatAED(value)}`;
}
function withdrawSim(){
  const amount=Number(document.getElementById("withdrawAmount")?.value||0);
  const grams=amount/GOLD_PRICE;
  const result=document.getElementById("withdrawResult");
  if(result) result.textContent=`AED ${amount.toLocaleString()} ${translations[currentLang()].require} ${grams.toFixed(2)}g gold.`;
}
function scrollToSection(id){document.getElementById(id)?.scrollIntoView({behavior:"smooth",block:"start"});}
function toastMessage(){const toast=document.getElementById("toast"); if(!toast)return; toast.classList.add("show"); setTimeout(()=>toast.classList.remove("show"),2300);}
if("serviceWorker" in navigator){window.addEventListener("load",()=>{navigator.serviceWorker.register("./sw.js").catch(()=>{});});}
setLang("en"); convertGold(); withdrawSim();
