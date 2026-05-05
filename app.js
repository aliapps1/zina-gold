const GOLD_PRICE_AED_PER_GRAM = 280;
let isCardFrozen = false;

const translations = {
  en: {
    brandName: 'ZINA Gold', brandSub: 'Gold-backed card demo', navFeatures: 'Features', navDemo: 'Demo', navCompliance: 'Compliance',
    badge: 'Professional Concept Demo • UAE & GCC', heroTitle1: 'Your wealth,', heroTitle2: 'always in hand.',
    heroText: 'ZINA Gold is a professional product demo for a gold-backed digital account and card experience, designed for users who want to hold value in gold and access spending power through regulated card partners.',
    tryDemo: 'Try Demo', seeHow: 'See How It Works', legalNote: 'Demo only. Banking, card issuing, custody, KYC, AML and ATM functions require regulated partner integration and approval.',
    cardHolder: 'Card Holder', cardStatusLabel: 'Status', freezeCard: 'Freeze Card', unfreezeCard: 'Unfreeze Card', active: 'ACTIVE', frozen: 'FROZEN',
    goldBalance: 'Gold Balance', aedValue: 'AED Value', goldPrice: 'Gold Price / g', demoLimit: 'Demo Card Limit',
    convertTitle: 'Convert Gold to AED', convertText: 'Simulate instant conversion from gold balance into AED spending power.', gramsLabel: 'Gold amount in grams', purposeLabel: 'Purpose', estimatedValue: 'Estimated value:',
    atmTitle: 'ATM Withdrawal Simulation', atmText: 'ATM withdrawal is shown as a regulated card issuer integration scenario.', withdrawLabel: 'Withdrawal amount', simulateButton: 'Simulate Request', requires: 'would require about', goldWord: 'gold',
    txTitle: 'Recent Transactions', txTopup: 'Gold top-up', txPurchase: 'Card purchase', txAtm: 'ATM simulation',
    complianceTitle: 'Compliance-Ready Flow', complianceText: 'The final product will require identity verification, AML screening, gold custody confirmation, and regulated card issuing before launch.', custodyPill: 'Gold Custody', issuerPill: 'Issuer API',
    feature1Title: 'Gold-backed value', feature1Text: 'Users can view balance in grams of gold and AED equivalent.', feature2Title: 'Card-ready concept', feature2Text: 'Designed for future Visa/Mastercard issuer integration.', feature3Title: 'UAE-first positioning', feature3Text: 'Built for UAE and GCC users who trust gold as a store of value.',
    footerText: 'Professional concept demo. Not a live financial service.'
  },
  ar: {
    brandName: 'زينة جولد', brandSub: 'نموذج بطاقة مدعومة بالذهب', navFeatures: 'المزايا', navDemo: 'العرض', navCompliance: 'الامتثال',
    badge: 'نموذج احترافي تجريبي • الإمارات والخليج', heroTitle1: 'ثروتك،', heroTitle2: 'دائماً في متناولك.',
    heroText: 'زينة جولد هو نموذج احترافي لحساب رقمي مدعوم بالذهب وتجربة بطاقة مستقبلية، للمستخدمين الذين يرغبون في حفظ القيمة بالذهب والوصول إلى قوة إنفاق عبر شركاء مرخصين.',
    tryDemo: 'جرّب العرض', seeHow: 'كيف يعمل', legalNote: 'هذه نسخة تجريبية فقط. الخدمات المصرفية، إصدار البطاقات، حفظ الذهب، KYC، AML والسحب من الصراف تتطلب تكاملاً مع شركاء مرخصين وموافقات تنظيمية.',
    cardHolder: 'حامل البطاقة', cardStatusLabel: 'الحالة', freezeCard: 'تجميد البطاقة', unfreezeCard: 'إلغاء التجميد', active: 'فعالة', frozen: 'مجمّدة',
    goldBalance: 'رصيد الذهب', aedValue: 'القيمة بالدرهم', goldPrice: 'سعر الذهب / جرام', demoLimit: 'حد البطاقة التجريبي',
    convertTitle: 'تحويل الذهب إلى درهم', convertText: 'محاكاة تحويل فوري من رصيد الذهب إلى قوة إنفاق بالدرهم.', gramsLabel: 'كمية الذهب بالجرام', purposeLabel: 'الغرض', estimatedValue: 'القيمة التقديرية:',
    atmTitle: 'محاكاة السحب من الصراف', atmText: 'يتم عرض السحب من الصراف كسيناريو تكامل مستقبلي مع جهة إصدار بطاقة مرخصة.', withdrawLabel: 'مبلغ السحب', simulateButton: 'محاكاة الطلب', requires: 'يتطلب تقريباً', goldWord: 'ذهب',
    txTitle: 'آخر العمليات', txTopup: 'إضافة ذهب', txPurchase: 'شراء بالبطاقة', txAtm: 'محاكاة صراف',
    complianceTitle: 'مسار جاهز للامتثال', complianceText: 'المنتج النهائي سيتطلب التحقق من الهوية، فحص مكافحة غسل الأموال، تأكيد حفظ الذهب، وإصدار بطاقة عبر جهة مرخصة قبل الإطلاق.', custodyPill: 'حفظ الذهب', issuerPill: 'واجهة المصدر',
    feature1Title: 'قيمة مدعومة بالذهب', feature1Text: 'يعرض المستخدم رصيده بجرامات الذهب وما يعادلها بالدرهم.', feature2Title: 'جاهز لفكرة البطاقة', feature2Text: 'مصمم لتكامل مستقبلي مع جهات إصدار Visa/Mastercard.', feature3Title: 'الانطلاق من الإمارات', feature3Text: 'مصمم لمستخدمي الإمارات والخليج الذين يثقون بالذهب كمخزن للقيمة.',
    footerText: 'نموذج احترافي تجريبي. ليس خدمة مالية مباشرة.'
  }
};

function getLanguage() {
  return document.documentElement.lang === 'ar' ? 'ar' : 'en';
}

function setLanguage(language) {
  const lang = translations[language] ? language : 'en';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.classList.toggle('rtl', lang === 'ar');

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (translations[lang][key]) element.textContent = translations[lang][key];
  });

  updateCardStatusText();
  convertGoldToAed();
  simulateWithdrawal();
  localStorage.setItem('zina_language', lang);
}

function updateCardStatusText() {
  const lang = getLanguage();
  document.getElementById('cardStatus').textContent = isCardFrozen ? translations[lang].frozen : translations[lang].active;
  document.getElementById('freezeButton').textContent = isCardFrozen ? translations[lang].unfreezeCard : translations[lang].freezeCard;
}

function convertGoldToAed() {
  const lang = getLanguage();
  const grams = Number(document.getElementById('goldInput').value || 0);
  const value = Math.round(grams * GOLD_PRICE_AED_PER_GRAM);
  document.getElementById('convertResult').textContent = `${translations[lang].estimatedValue} AED ${value.toLocaleString('en-US')}`;
}

function simulateWithdrawal() {
  const lang = getLanguage();
  const amount = Number(document.getElementById('withdrawInput').value || 0);
  const gramsRequired = amount / GOLD_PRICE_AED_PER_GRAM;
  document.getElementById('withdrawResult').textContent = `AED ${amount.toLocaleString('en-US')} ${translations[lang].requires} ${gramsRequired.toFixed(2)}g ${translations[lang].goldWord}.`;
}

function toggleCardStatus() {
  isCardFrozen = !isCardFrozen;
  updateCardStatusText();
}

function goToSection(id) {
  const section = document.getElementById(id);
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initApp() {
  const savedLanguage = localStorage.getItem('zina_language') || 'en';
  setLanguage(savedLanguage);
}

initApp();
