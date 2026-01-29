-- CreateEnum
CREATE TYPE "WorkOrderType" AS ENUM ('PM', 'CORRECTIVE');

-- CreateEnum
CREATE TYPE "WorkOrderStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "WorkOrderPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "AssetStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "LocationStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "FrequencyType" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'SEMI_ANNUALLY', 'ANNUALLY', 'HOURS_BASED', 'MILEAGE_BASED');

-- CreateEnum
CREATE TYPE "WorkTaskStatus" AS ENUM ('ASSIGNED', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'SENT', 'FAILED', 'RETRYING', 'CANCELLED');

-- CreateEnum
CREATE TYPE "NotificationChannel" AS ENUM ('EMAIL', 'PUSH', 'SMS', 'IN_APP', 'WEBHOOK');

-- CreateEnum
CREATE TYPE "NotificationAttemptStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "LookupKind" AS ENUM ('DEPARTMENT', 'ASSET_CATEGORY', 'LOCATION_CATEGORY', 'MATERIAL');

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_profile" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT,
    "employee_code" TEXT,
    "phone" TEXT,
    "phone_alt" TEXT,
    "country" TEXT,
    "skills" TEXT,
    "certifications" TEXT,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_site" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_role" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "created_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permission" (
    "id" UUID NOT NULL,
    "role_id" UUID NOT NULL,
    "permission_id" UUID NOT NULL,
    "created_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lookup" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "kind" "LookupKind" NOT NULL,
    "parent_id" UUID,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "description" TEXT,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lookup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "parent_location_id" UUID,
    "category_id" UUID,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "person_in_charge_id" UUID,
    "status" "LocationStatus" NOT NULL DEFAULT 'ACTIVE',
    "image_url" TEXT,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "asset" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "location_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "asset_category_id" UUID NOT NULL,
    "department_id" UUID,
    "parent_asset_id" UUID,
    "serial_number" TEXT,
    "make" TEXT,
    "model" TEXT,
    "purchase_date" TIMESTAMP(3),
    "purchase_price" DECIMAL(15,2),
    "warranty_expiry_date" TIMESTAMP(3),
    "person_in_charge_id" UUID,
    "status" "AssetStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pm_schedule" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "asset_id" UUID NOT NULL,
    "priority" "WorkOrderPriority" NOT NULL DEFAULT 'MEDIUM',
    "description" TEXT NOT NULL,
    "frequency_type" "FrequencyType" NOT NULL,
    "frequency_value" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "next_due_date" TIMESTAMP(3),
    "last_generated_date" TIMESTAMP(3),
    "last_completed_date" TIMESTAMP(3),
    "estimate_hours" DOUBLE PRECISION,
    "instructions" TEXT,
    "auto_generate" BOOLEAN NOT NULL DEFAULT true,
    "warning_days" INTEGER NOT NULL DEFAULT 7,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pm_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "code" TEXT NOT NULL,
    "asset_id" UUID NOT NULL,
    "status" "WorkOrderStatus" NOT NULL DEFAULT 'OPEN',
    "priority" "WorkOrderPriority" NOT NULL DEFAULT 'MEDIUM',
    "type" "WorkOrderType" NOT NULL DEFAULT 'CORRECTIVE',
    "description" TEXT NOT NULL,
    "assign_id" UUID,
    "cost" DECIMAL(15,2),
    "expected_start_date" TIMESTAMP(3),
    "expected_end_date" TIMESTAMP(3),
    "estimate_time_hours" DOUBLE PRECISION,
    "actual_start_date" TIMESTAMP(3),
    "actual_end_date" TIMESTAMP(3),
    "actual_time_hours" DOUBLE PRECISION,
    "completion_note" TEXT,
    "pm_schedule_id" UUID,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "work_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order_note" (
    "id" UUID NOT NULL,
    "work_order_id" UUID NOT NULL,
    "note" TEXT NOT NULL,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_order_note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "work_order_assignment" (
    "id" UUID NOT NULL,
    "work_order_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "assigned_by" UUID NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL,
    "removed_by_id" UUID,
    "removed_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_order_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wo_task" (
    "id" UUID NOT NULL,
    "wo_id" UUID NOT NULL,
    "task_number" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "assignee_user_id" UUID,
    "expected_start_date" TIMESTAMP(3),
    "expected_end_date" TIMESTAMP(3),
    "estimate_time_hours" DOUBLE PRECISION,
    "actual_start_date" TIMESTAMP(3),
    "actual_end_date" TIMESTAMP(3),
    "actual_time_hours" DOUBLE PRECISION,
    "status" "WorkTaskStatus" NOT NULL DEFAULT 'ASSIGNED',
    "completion_note" TEXT,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wo_task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meter_reading" (
    "id" UUID NOT NULL,
    "asset_id" UUID NOT NULL,
    "reading_value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "reading_date" TIMESTAMP(3) NOT NULL,
    "read_by" UUID NOT NULL,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meter_reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_event" (
    "id" UUID NOT NULL,
    "site_id" UUID NOT NULL,
    "event_name" TEXT NOT NULL,
    "user_id" UUID,
    "channels" JSONB,
    "recipient" JSONB,
    "payload" JSONB,
    "metadata" JSONB,
    "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
    "status_message" TEXT,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "sent_at" TIMESTAMP(3),
    "failed_at" TIMESTAMP(3),
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notification_event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification_attempt" (
    "id" UUID NOT NULL,
    "event_id" UUID NOT NULL,
    "status" "NotificationAttemptStatus" NOT NULL,
    "channel" "NotificationChannel",
    "response_code" TEXT,
    "response_body" JSONB,
    "error_message" TEXT,
    "provider_id" TEXT,
    "occurred_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by_id" UUID,
    "updated_by_id" UUID,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "notification_attempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "user_created_at_idx" ON "user"("created_at");

-- CreateIndex
CREATE INDEX "user_updated_at_idx" ON "user"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_profile_user_id_key" ON "user_profile"("user_id");

-- CreateIndex
CREATE INDEX "user_profile_employee_code_idx" ON "user_profile"("employee_code");

-- CreateIndex
CREATE UNIQUE INDEX "site_name_key" ON "site"("name");

-- CreateIndex
CREATE INDEX "site_name_idx" ON "site"("name");

-- CreateIndex
CREATE INDEX "site_location_idx" ON "site"("location");

-- CreateIndex
CREATE INDEX "user_site_site_id_idx" ON "user_site"("site_id");

-- CreateIndex
CREATE INDEX "user_site_user_id_idx" ON "user_site"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_site_site_id_user_id_key" ON "user_site"("site_id", "user_id");

-- CreateIndex
CREATE INDEX "role_site_id_idx" ON "role"("site_id");

-- CreateIndex
CREATE INDEX "role_created_at_idx" ON "role"("created_at");

-- CreateIndex
CREATE INDEX "role_updated_at_idx" ON "role"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "role_site_id_code_key" ON "role"("site_id", "code");

-- CreateIndex
CREATE UNIQUE INDEX "role_site_id_name_key" ON "role"("site_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "permission_code_key" ON "permission"("code");

-- CreateIndex
CREATE INDEX "permission_name_idx" ON "permission"("name");

-- CreateIndex
CREATE INDEX "permission_created_at_idx" ON "permission"("created_at");

-- CreateIndex
CREATE INDEX "permission_updated_at_idx" ON "permission"("updated_at");

-- CreateIndex
CREATE INDEX "user_role_site_id_idx" ON "user_role"("site_id");

-- CreateIndex
CREATE INDEX "user_role_user_id_idx" ON "user_role"("user_id");

-- CreateIndex
CREATE INDEX "user_role_role_id_idx" ON "user_role"("role_id");

-- CreateIndex
CREATE INDEX "user_role_created_at_idx" ON "user_role"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "user_role_site_id_user_id_role_id_key" ON "user_role"("site_id", "user_id", "role_id");

-- CreateIndex
CREATE INDEX "role_permission_role_id_idx" ON "role_permission"("role_id");

-- CreateIndex
CREATE INDEX "role_permission_permission_id_idx" ON "role_permission"("permission_id");

-- CreateIndex
CREATE INDEX "role_permission_created_at_idx" ON "role_permission"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "role_permission_role_id_permission_id_key" ON "role_permission"("role_id", "permission_id");

-- CreateIndex
CREATE INDEX "lookup_site_id_idx" ON "lookup"("site_id");

-- CreateIndex
CREATE INDEX "lookup_site_id_kind_idx" ON "lookup"("site_id", "kind");

-- CreateIndex
CREATE INDEX "lookup_parent_id_idx" ON "lookup"("parent_id");

-- CreateIndex
CREATE UNIQUE INDEX "lookup_site_id_kind_code_key" ON "lookup"("site_id", "kind", "code");

-- CreateIndex
CREATE INDEX "location_site_id_idx" ON "location"("site_id");

-- CreateIndex
CREATE INDEX "location_parent_location_id_idx" ON "location"("parent_location_id");

-- CreateIndex
CREATE INDEX "location_category_id_idx" ON "location"("category_id");

-- CreateIndex
CREATE INDEX "location_person_in_charge_id_idx" ON "location"("person_in_charge_id");

-- CreateIndex
CREATE UNIQUE INDEX "location_site_id_code_key" ON "location"("site_id", "code");

-- CreateIndex
CREATE INDEX "asset_site_id_idx" ON "asset"("site_id");

-- CreateIndex
CREATE INDEX "asset_location_id_idx" ON "asset"("location_id");

-- CreateIndex
CREATE INDEX "asset_asset_category_id_idx" ON "asset"("asset_category_id");

-- CreateIndex
CREATE INDEX "asset_department_id_idx" ON "asset"("department_id");

-- CreateIndex
CREATE INDEX "asset_parent_asset_id_idx" ON "asset"("parent_asset_id");

-- CreateIndex
CREATE INDEX "asset_serial_number_idx" ON "asset"("serial_number");

-- CreateIndex
CREATE INDEX "asset_status_idx" ON "asset"("status");

-- CreateIndex
CREATE UNIQUE INDEX "asset_site_id_code_key" ON "asset"("site_id", "code");

-- CreateIndex
CREATE INDEX "pm_schedule_site_id_idx" ON "pm_schedule"("site_id");

-- CreateIndex
CREATE INDEX "pm_schedule_asset_id_idx" ON "pm_schedule"("asset_id");

-- CreateIndex
CREATE INDEX "pm_schedule_next_due_date_idx" ON "pm_schedule"("next_due_date");

-- CreateIndex
CREATE INDEX "pm_schedule_is_active_idx" ON "pm_schedule"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "pm_schedule_site_id_code_key" ON "pm_schedule"("site_id", "code");

-- CreateIndex
CREATE INDEX "work_order_site_id_idx" ON "work_order"("site_id");

-- CreateIndex
CREATE INDEX "work_order_asset_id_idx" ON "work_order"("asset_id");

-- CreateIndex
CREATE INDEX "work_order_status_idx" ON "work_order"("status");

-- CreateIndex
CREATE INDEX "work_order_priority_idx" ON "work_order"("priority");

-- CreateIndex
CREATE INDEX "work_order_type_idx" ON "work_order"("type");

-- CreateIndex
CREATE INDEX "work_order_pm_schedule_id_idx" ON "work_order"("pm_schedule_id");

-- CreateIndex
CREATE INDEX "work_order_assign_id_idx" ON "work_order"("assign_id");

-- CreateIndex
CREATE UNIQUE INDEX "work_order_site_id_code_key" ON "work_order"("site_id", "code");

-- CreateIndex
CREATE INDEX "work_order_note_work_order_id_idx" ON "work_order_note"("work_order_id");

-- CreateIndex
CREATE INDEX "work_order_assignment_work_order_id_idx" ON "work_order_assignment"("work_order_id");

-- CreateIndex
CREATE INDEX "work_order_assignment_user_id_idx" ON "work_order_assignment"("user_id");

-- CreateIndex
CREATE INDEX "work_order_assignment_assigned_by_idx" ON "work_order_assignment"("assigned_by");

-- CreateIndex
CREATE INDEX "work_order_assignment_is_active_idx" ON "work_order_assignment"("is_active");

-- CreateIndex
CREATE INDEX "wo_task_wo_id_idx" ON "wo_task"("wo_id");

-- CreateIndex
CREATE INDEX "wo_task_task_number_idx" ON "wo_task"("task_number");

-- CreateIndex
CREATE INDEX "wo_task_status_idx" ON "wo_task"("status");

-- CreateIndex
CREATE INDEX "wo_task_code_idx" ON "wo_task"("code");

-- CreateIndex
CREATE INDEX "wo_task_assignee_user_id_idx" ON "wo_task"("assignee_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "wo_task_wo_id_task_number_key" ON "wo_task"("wo_id", "task_number");

-- CreateIndex
CREATE INDEX "meter_reading_asset_id_idx" ON "meter_reading"("asset_id");

-- CreateIndex
CREATE INDEX "meter_reading_reading_date_idx" ON "meter_reading"("reading_date");

-- CreateIndex
CREATE INDEX "meter_reading_read_by_idx" ON "meter_reading"("read_by");

-- CreateIndex
CREATE INDEX "notification_event_site_id_idx" ON "notification_event"("site_id");

-- CreateIndex
CREATE INDEX "notification_event_user_id_idx" ON "notification_event"("user_id");

-- CreateIndex
CREATE INDEX "notification_event_event_name_idx" ON "notification_event"("event_name");

-- CreateIndex
CREATE INDEX "notification_event_status_idx" ON "notification_event"("status");

-- CreateIndex
CREATE INDEX "notification_event_occurred_at_idx" ON "notification_event"("occurred_at");

-- CreateIndex
CREATE INDEX "notification_event_site_id_event_name_occurred_at_idx" ON "notification_event"("site_id", "event_name", "occurred_at");

-- CreateIndex
CREATE INDEX "notification_event_site_id_user_id_idx" ON "notification_event"("site_id", "user_id");

-- CreateIndex
CREATE INDEX "notification_event_site_id_status_idx" ON "notification_event"("site_id", "status");

-- CreateIndex
CREATE INDEX "notification_attempt_event_id_idx" ON "notification_attempt"("event_id");

-- CreateIndex
CREATE INDEX "notification_attempt_status_idx" ON "notification_attempt"("status");

-- CreateIndex
CREATE INDEX "notification_attempt_occurred_at_idx" ON "notification_attempt"("occurred_at");

-- AddForeignKey
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_site" ADD CONSTRAINT "user_site_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_site" ADD CONSTRAINT "user_site_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role" ADD CONSTRAINT "role_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_role" ADD CONSTRAINT "user_role_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permission" ADD CONSTRAINT "role_permission_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lookup" ADD CONSTRAINT "lookup_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lookup" ADD CONSTRAINT "lookup_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "lookup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_parent_location_id_fkey" FOREIGN KEY ("parent_location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "lookup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_person_in_charge_id_fkey" FOREIGN KEY ("person_in_charge_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_asset_category_id_fkey" FOREIGN KEY ("asset_category_id") REFERENCES "lookup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "lookup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_parent_asset_id_fkey" FOREIGN KEY ("parent_asset_id") REFERENCES "asset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_person_in_charge_id_fkey" FOREIGN KEY ("person_in_charge_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pm_schedule" ADD CONSTRAINT "pm_schedule_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pm_schedule" ADD CONSTRAINT "pm_schedule_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_assign_id_fkey" FOREIGN KEY ("assign_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order" ADD CONSTRAINT "work_order_pm_schedule_id_fkey" FOREIGN KEY ("pm_schedule_id") REFERENCES "pm_schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_note" ADD CONSTRAINT "work_order_note_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_assignment" ADD CONSTRAINT "work_order_assignment_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "work_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_assignment" ADD CONSTRAINT "work_order_assignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_assignment" ADD CONSTRAINT "work_order_assignment_assigned_by_fkey" FOREIGN KEY ("assigned_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_order_assignment" ADD CONSTRAINT "work_order_assignment_removed_by_id_fkey" FOREIGN KEY ("removed_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wo_task" ADD CONSTRAINT "wo_task_wo_id_fkey" FOREIGN KEY ("wo_id") REFERENCES "work_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wo_task" ADD CONSTRAINT "wo_task_assignee_user_id_fkey" FOREIGN KEY ("assignee_user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meter_reading" ADD CONSTRAINT "meter_reading_asset_id_fkey" FOREIGN KEY ("asset_id") REFERENCES "asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meter_reading" ADD CONSTRAINT "meter_reading_read_by_fkey" FOREIGN KEY ("read_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_event" ADD CONSTRAINT "notification_event_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "site"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_event" ADD CONSTRAINT "notification_event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification_attempt" ADD CONSTRAINT "notification_attempt_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "notification_event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
