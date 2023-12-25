import { Box, Card, CardBody, Flex, IconButton, Image, Input, InputGroup, InputRightElement, LinkBox, LinkOverlay, List, ListItem, Select, Tag, TagRightIcon, Text, Textarea } from "@chakra-ui/react"
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import placeHolderPic from "../assets/placeholderPic.png"
import { BACKEND_URLS, PRIORITY_VALUES, STATUS_VALUES } from "../lib/Constants";
import "./HomePage.scss"

type TaskItem = {
    id: number,
    status: string;
    priority: string;
    title: string;
};

type TaskItemProps = {
    task: TaskItem;
};

type TaskItemsProps = {
    tasks: TaskItem[];
}

const tasks: TaskItem[] = [
    {
        "id": 1,
        "priority": "CRITICAL",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    },
    {
        "id": 2,
        "priority": "LOW",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    },
    {
        "id": 3,
        "priority": "HIGH",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    },
    {
        "id": 4,
        "priority": "CRITICAL",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    },
    {
        "id": 5,
        "priority": "CRITICAL",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    },
    {
        "id": 6,
        "priority": "CRITICAL",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    },
    {
        "id": 7,
        "priority": "CRITICAL",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    },
    {
        "id": 8,
        "priority": "CRITICAL",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    },
    {
        "id": 9,
        "priority": "CRITICAL",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    },
    {
        "id": 10,
        "priority": "CRITICAL",
        "status": "TO_DO",
        "title": "View a summary of all your customers over the last month."
    }
]

function HomePage() {
    return (
        <Box id="homePage">
            <CreateTaskBox />
            <br />

            <Text fontSize="lg" id="homePage-header">Tasks</Text>
            <br />
            
            {tasks.length == 0 && <NoTaskCard />}

            {tasks.length > 0 && <TaskItems tasks={tasks} />}
        </Box>
    )
}

export const CreateTaskBox = () => {
    const handleSubmitTask = () => {
        console.log("Creating new task!")
    }

    return (
        <Flex justifyContent={"space-between"}>
            <InputGroup>
                <Input maxLength={200} placeholder='Enter your task' />
                <InputRightElement>
                    <IconButton
                        colorScheme='transparent'
                        aria-label='create task'
                        onClick={handleSubmitTask}
                        icon={
                            <CheckIcon color="green" />
                        }
                    />
                </InputRightElement>
            </InputGroup>
        </Flex>
    )
}

export const NoTaskCard = () => {
    return (
        <Card id="noTaskCard">
            <Text fontWeight={"medium"}>Currently, there are no tasks.</Text>
            <Image src={placeHolderPic} height="15em" width="20em" />
        </Card>
    )
}

export const TaskItems: React.FC<TaskItemsProps> = ({tasks}) => {
    return (
        <List>
            {tasks.map((task) =>
                <TaskItem key={task.id} task={task} />
            )}
        </List>
    )
}

export const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
    const handleTaskDeletion = () => {
        console.log(`Task ${task.id} Deleted!`)
    }

    return (
        <ListItem>
            <LinkBox as='article'>
                <Card 
                    variant="outline" 
                    className="taskCard"
                >
                    <CardBody
                        className="taskCard-body"
                    >
                        <Text className="taskCard-priority">
                            <Tag colorScheme={PRIORITY_VALUES[task.priority].color}>
                                {task.priority}
                            </Tag>
                        </Text>

                        <LinkOverlay 
                            href={BACKEND_URLS.TASK_PAGE_URL + `/${task.id}`}
                            className="taskCard-title"
                        >
                            <Text >
                                {task.title}
                            </Text>
                        </LinkOverlay>
                        
                        <Select 
                            variant='filled' 
                            width={"max-content"} 
                            placeholder='Select status'
                            bg={STATUS_VALUES[task.status].color}
                            defaultValue={task.status}
                        >
                            {Object.values(STATUS_VALUES).map(statusObject =>  
                                <option key={statusObject.value} value={statusObject.value}>
                                    {statusObject.value}
                                </option>    
                            )}
                        </Select>

                        <IconButton 
                            aria-label="delete-task-btn" 
                            icon={<DeleteIcon/>} 
                            onClick={handleTaskDeletion}
                        />
                    </CardBody>
                </Card>
            </LinkBox>
        </ListItem>
    )
}

export default HomePage;