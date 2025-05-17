// src/utils/telegramUser.ts

export const tg = window.Telegram.WebApp;

export const initData = tg.initData || "user=%7B%22id%22%3A7981172932%2C%22first_name%22%3A%22null%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22dev_planet%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FoUFEaxx3Fw3u2Obaqh5ydCc1QfMhEUvobWbwlGQkiBj-ykZWpaflFSNJUDRgMi99.svg%22%7D&chat_instance=498061754596395743&chat_type=sender&auth_date=1747480505&signature=jExZ3Jtb60CC3HASVAJmB1K70joqf7e-dwOm6e0mJMTrg_5PxwG-JSQ1fhkPZ9LD6hGeI1aaAITtGx1yorI6Cg&hash=0068c3acb25b11f34cef8b616dea57e60ef6e0c0dabfbb2d7c446787e0150efd";

export const user = tg.initDataUnsafe?.user;

export const user_id = user?.id || '7981172932';
export const first_name = user?.first_name ?? '';
export const last_name = user?.last_name ?? '';
export const username = user?.username ?? '';
export const language_code = user?.language_code ?? 'en';
