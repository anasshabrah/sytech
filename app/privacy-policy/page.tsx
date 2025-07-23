// app/privacy-policy/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية - Habrah LLC',
  description: 'نشكركم على زيارة موقع Habrah LLC. نحن ملتزمون بحماية خصوصيتكم وسلامة بياناتكم الشخصية.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="container mx-auto pt-24 pb-16 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        سياسة الخصوصية لموقع Habrah LLC
      </h1>

      <p className="mb-6">
        نشكركم على زيارة موقع Habrah LLC، نحن نقدر ثقتكم ونلتزم بحماية خصوصيتكم وضمان سلامة بياناتكم الشخصية. توضح سياسة الخصوصية التالية كيفية جمع، استخدام، ومشاركة البيانات عند زيارة واستخدام خدماتنا.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. المعلومات التي نقوم بجمعها</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>المعلومات الشخصية:</strong> مثل الاسم، البريد الإلكتروني، رقم الهاتف، ومعلومات التواصل الأخرى التي تقدمها طوعاً عند ملء النماذج أو طلب الاستشارات.
          </li>
          <li>
            <strong>المعلومات التقنية:</strong> بيانات جمع تلقائية مثل عنوان الـIP، نوع المتصفح، مزود خدمة الإنترنت، الصفحات التي تزورها، وقت وتاريخ الزيارة، وغيرها من التحليلات لتوفير تجربة أفضل.
          </li>
          <li>
            <strong>المعاملات المالية:</strong> نستخدم مزودي خدمة الدفع الموثوقين لمعالجة المدفوعات. نحن لا نخزن تفاصيل بطاقة الدفع الخاصة بك بشكل مباشر.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. كيفية استخدام المعلومات</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>لتقديم خدماتنا وتحسين تجربة المستخدم.</li>
          <li>للرد على استفساراتك وتوفير الاستشارات التقنية.</li>
          <li>لتحليل البيانات ومعرفة اهتمامات المستخدمين وتحسين المحتوى والخدمات.</li>
          <li>لتأمين وحماية الموقع من الأنشطة غير المشروعة أو الاحتيال.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. مشاركة المعلومات</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>مع الأطراف الثالثة:</strong> نحن لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة إلا بموافقتك أو كما هو مطلوب بموجب القانون أو للامتثال للوائح.
          </li>
          <li>
            <strong>مع مزودي الخدمات:</strong> قد نشارك بياناتك مع مزودي الخدمات الذين يساعدون في تشغيل الموقع أو تحسين الخدمة (مثل خدمات الدفع والتحليلات).
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. الأمن</h2>
        <p>
          نستخدم تدابير أمان متقدمة لحماية بياناتك من الوصول غير المصرح به أو الكشف أو التغيير أو الإتلاف. ومع ذلك، لا يمكن ضمان أمان المعلومات بالكامل عبر الإنترنت.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. ملفات تعريف الارتباط (الكوكيز)</h2>
        <p>
          نستخدم ملفات تعريف الارتباط لجمع معلومات تساعدنا على تخصيص المحتوى وتقديم تجربة أفضل للمستخدم. يمكنك ضبط متصفحك لرفض ملفات تعريف الارتباط، ولكن قد يؤثر ذلك على تجربتك في استخدام الموقع.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">6. حقوقك</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها أو تحديثها.</li>
          <li>يمكنك طلب حذف بياناتك أو الاعتراض على استخدام بياناتك لأغراض تسويقية.</li>
          <li>يمكنك سحب موافقتك في أي وقت على استخدام بياناتك الشخصية.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">7. التغييرات في سياسة الخصوصية</h2>
        <p>
          نحتفظ بالحق في تحديث سياسة الخصوصية بشكل دوري، وسيتم إخطار المستخدمين بأي تغييرات هامة عبر البريد الإلكتروني أو عبر إشعار على الموقع.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">8. التواصل معنا</h2>
        <p>
          لأي استفسارات أو طلبات تتعلق بسياسة الخصوصية أو ممارسة حقوقك، يرجى التواصل معنا عبر البريد الإلكتروني: <a href="mailto:habrahllc@gmail.com" className="text-primary-dark underline">habrahllc@gmail.com</a>.
        </p>
      </section>
    </main>
  );
}