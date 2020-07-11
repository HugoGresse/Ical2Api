import React, { useEffect, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import { ReminderType } from './remindersConstants'
import Tab from '@material-ui/core/Tab'
import { selectRemindersByType } from '../../../state/selectors'
import ReminderTypeNotice from './ReminderTypeNotice'
import { DAYS } from '../../../utils/date'
import ReminderItem from './ReminderItem'

const NEW_ITEM_VALUE = 'new'

const RemindersInnerTabs = ({
    reminders,
    defaultSlackWebHook,
    onNewReminder,
    onEditReminder,
    onDelete,
}) => {
    const [firstMenuValue, setFirstMenuValue] = useState(ReminderType.hour.id)
    const [secondMenuValue, setSecondMenuValue] = useState(false)
    const [selectedReminders, setReminders] = useState([])

    const onFirstMenuChange = (e, value) => {
        setSecondMenuValue(false)
        setFirstMenuValue(value)
    }

    const onDeleteReminder = async reminder => {
        const tempSelectedReminder = secondMenuValue
        setSecondMenuValue(false)
        const success = await onDelete(reminder)
        if (!success) {
            setSecondMenuValue(tempSelectedReminder)
        }
    }

    useEffect(() => {
        setReminders(selectRemindersByType(reminders, firstMenuValue))
    }, [reminders, setReminders, firstMenuValue])

    return (
        <Paper>
            <Box display="flex" flexGrow={1}>
                <Tabs
                    orientation="vertical"
                    value={firstMenuValue}
                    onChange={onFirstMenuChange}
                    aria-label="Reminder type"
                    style={{ minWidth: 170, borderRight: '1px solid #BBB' }}>
                    {Object.keys(ReminderType).map((key, index) => (
                        <Tab
                            label={ReminderType[key].name}
                            value={key}
                            key={key}
                        />
                    ))}
                </Tabs>

                {Object.keys(ReminderType).map((key, index) => (
                    <TabPanel
                        value={firstMenuValue}
                        index={key}
                        key={key}
                        padding={0}
                        style={{ display: 'flex' }}>
                        <Tabs
                            orientation="vertical"
                            value={secondMenuValue}
                            onChange={(e, value) => setSecondMenuValue(value)}
                            aria-label="Reminder"
                            style={{
                                minWidth: 170,
                                borderRight: '1px solid #BBB',
                                minHeight: '100%',
                            }}>
                            {selectedReminders.map(reminder => (
                                <Tab
                                    label={getTabLabel(reminder)}
                                    value={reminder.id}
                                    key={reminder.id}
                                />
                            ))}
                            <Tab
                                label="+ NEW Reminder"
                                value={NEW_ITEM_VALUE}
                                key={NEW_ITEM_VALUE}
                            />

                            <ReminderTypeNotice reminderId={key} />
                        </Tabs>

                        {selectedReminders.map(reminder => (
                            <TabPanel
                                value={secondMenuValue}
                                index={reminder.id}
                                key={reminder.id}>
                                <ReminderItem
                                    reminder={reminder}
                                    reminderType={firstMenuValue}
                                    onSubmit={onEditReminder}
                                    onDelete={onDeleteReminder}
                                />
                            </TabPanel>
                        ))}
                        <TabPanel
                            value={secondMenuValue}
                            index={NEW_ITEM_VALUE}
                            key={key}>
                            <ReminderItem
                                reminderType={firstMenuValue}
                                defaultSlackWebHook={defaultSlackWebHook}
                                onSubmit={onNewReminder}
                            />
                        </TabPanel>
                    </TabPanel>
                ))}
            </Box>
        </Paper>
    )
}

const getTabLabel = reminder => {
    switch (reminder.type) {
        case ReminderType.hour.id:
            return `-${reminder.hours}h before`
        case ReminderType.weekly.id:
            return `On ${DAYS[reminder.weekday - 1]} at ${reminder.hours}:00`
        case ReminderType.created.id:
            return reminder.id
        default:
            return 'Not managed'
    }
}

function TabPanel({ children, value, index, padding = 3, ...other }) {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={padding} display="flex">
                    {children}
                </Box>
            )}
        </div>
    )
}

export default RemindersInnerTabs
