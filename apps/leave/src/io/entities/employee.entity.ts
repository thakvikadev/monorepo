import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({ schema: 'public', name: 'v_employees' })
export class EmployeeView {
    @ViewColumn()
    id?: number;

    @ViewColumn()
    uuid?: string;

    @ViewColumn()
    code?: number;

    @ViewColumn()
    title?: string;

    @ViewColumn()
    location?: string;

    @ViewColumn()
    functional?: string;

    @ViewColumn()
    doe?: string;

    @ViewColumn()
    dob?: string;

    @ViewColumn()
    profile?: string;

    @ViewColumn({ name: 'full_name' })
    fullName?: string;

    @ViewColumn()
    gender?: string;

    @ViewColumn()
    username?: string;

    @ViewColumn()
    email?: string;

    @ViewColumn()
    shift?: string;

    @ViewColumn()
    active?: boolean;

    @ViewColumn()
    status?: string;

    @ViewColumn({ name: 'country_code' })
    countryCode?: string;

    @ViewColumn({ name: 'phone_number' })
    phoneNumber?: string;

    @ViewColumn()
    date?: string;
}
