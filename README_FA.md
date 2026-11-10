# React Native + Expo + Gluestack UI — Cursor Rules & Skills

این پکیج شامل **۷ Rule** و **۶ Skill** قابل استفاده در Cursor است. هیچ وابستگی npm اضافه نمی‌کند.

## نصب در پروژه (Windows PowerShell)

1. فایل ZIP را باز کن. پوشه `.cursor` را در ریشه پروژه React Native کنار `package.json` کپی کن.
2. اگر پوشه `.cursor` از قبل وجود دارد، محتویات را merge کن و قبل از overwrite کردن فایل‌های هم‌نام بررسی کن.
3. در Cursor همان پروژه را باز کن، یک Agent Chat جدید بساز و از **Customize → Rules / Skills** فایل‌ها را بررسی کن.
4. برای اجرای دستی یک Skill داخل چت Cursor بنویس:
   - `/rn-feature-builder`
   - `/rn-clean-refactor`
   - `/rn-design-patterns`
   - `/rn-code-review`
   - `/rn-performance-audit`
   - `/rn-test-plan`

## نصب Skill رسمی Gluestack (مستقل از این ZIP)

ابتدا نسخه نصب‌شده را از `package.json` یا کامپوننت‌های پروژه تعیین کن. برای v5:

```powershell
npx skills add gluestack/agent-skills --skill gluestack-ui-v5
```

برای v4 نسخه متناظر `gluestack-ui-v4` را انتخاب کن. در installer مقصد Cursor را انتخاب کن.

## محل فایل‌ها

- Project Rules: `<project>/.cursor/rules/*.mdc`
- Project Skills: `<project>/.cursor/skills/<name>/SKILL.md`
- User-wide Skills (اختیاری): `$HOME\.cursor\skills\<name>\SKILL.md`

Rule اصلی `00-project-guardrails` همیشه فعال است؛ بقیه به تناسب فایل/موضوع فعال می‌شوند. همه Rules را always-on نکن چون توکن و نویز افزایش پیدا می‌کند.

## تست صحت نصب

از Cursor Agent بپرس: `List my project rules and available rn-* skills; do not edit any file.`

## نکات

- این فایل‌ها راهنمای Agent هستند؛ هیچ تضمینی برای رعایت خودکار قواعد در همه پاسخ‌ها ندارند. ESLint، TypeScript، تست و code review همچنان لازم است.
- اگر پروژه از Gluestack v4 یا استایل‌انجین دیگری استفاده می‌کند، از Rule بخواه معماری موجود را حفظ کند و دستورالعمل‌های نسخه دیگر را وارد نکند.
- برای توسعه شخصی در تمام پروژه‌ها، Skills را می‌توان به `$HOME\.cursor\skills` منتقل کرد؛ Rules پروژه را در هر مخزن مرتبط نگه دار.

مراجع رسمی:
https://cursor.com/help/customization/skills
https://cursor.com/docs/rules
https://github.com/gluestack/agent-skills
https://docs.expo.dev/router/reference/src-directory/
